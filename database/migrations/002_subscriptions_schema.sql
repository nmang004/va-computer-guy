-- Protection Plans Subscription System Database Schema
-- This schema extends the existing database to support subscription management

-- Create customers table to store customer information
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscription plans table for plan definitions
CREATE TABLE IF NOT EXISTS subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    plan_type VARCHAR(50) NOT NULL, -- 'residential' or 'business'
    price_monthly DECIMAL(10,2) NOT NULL,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default protection plans
INSERT INTO subscription_plans (name, description, plan_type, price_monthly, features) VALUES
(
    'Residential Protection',
    'Perfect for families and home users',
    'residential',
    19.99,
    '[
        "24/7 Remote Monitoring",
        "Automatic Security Updates", 
        "Monthly System Tune-ups",
        "Priority Technical Support",
        "Antivirus Protection",
        "Basic Data Backup (5GB)",
        "20% Discount on Repairs"
    ]'::jsonb
),
(
    'Business Protection',
    'Comprehensive IT protection for businesses',
    'business',
    99.99,
    '[
        "24/7 Remote Monitoring",
        "Automatic Security Updates",
        "Weekly System Maintenance", 
        "Priority Technical Support",
        "Enterprise Antivirus Protection",
        "Automated Data Backup (Unlimited)",
        "30% Discount on Repairs",
        "Network Monitoring",
        "Server Management"
    ]'::jsonb
);

-- Create subscriptions table to track active subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES subscription_plans(id),
    square_subscription_id VARCHAR(255) UNIQUE,
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, active, paused, canceled, expired
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    cancel_at_period_end BOOLEAN DEFAULT false,
    canceled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table to track billing history
CREATE TABLE IF NOT EXISTS subscription_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subscription_id UUID NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
    square_payment_id VARCHAR(255) UNIQUE,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(50) NOT NULL, -- pending, completed, failed, refunded
    payment_date TIMESTAMP WITH TIME ZONE,
    failure_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscription events table for audit trail
CREATE TABLE IF NOT EXISTS subscription_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subscription_id UUID NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL, -- created, activated, paused, canceled, payment_succeeded, payment_failed
    event_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_customers_user_id ON customers(user_id);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_customer_id ON subscriptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_square_id ON subscriptions(square_subscription_id);
CREATE INDEX IF NOT EXISTS idx_payments_subscription_id ON subscription_payments(subscription_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON subscription_payments(status);
CREATE INDEX IF NOT EXISTS idx_events_subscription_id ON subscription_events(subscription_id);
CREATE INDEX IF NOT EXISTS idx_events_type ON subscription_events(event_type);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscription_plans_updated_at BEFORE UPDATE ON subscription_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscription_payments_updated_at BEFORE UPDATE ON subscription_payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_events ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Customers can only see their own data
CREATE POLICY "Users can view own customer data" ON customers
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own customer data" ON customers
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own customer data" ON customers
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Subscription plans are readable by all authenticated users
CREATE POLICY "Subscription plans are viewable by everyone" ON subscription_plans
    FOR SELECT TO authenticated USING (is_active = true);

-- Subscriptions can only be viewed by the customer who owns them
CREATE POLICY "Users can view own subscriptions" ON subscriptions
    FOR SELECT USING (
        customer_id IN (
            SELECT id FROM customers WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own subscriptions" ON subscriptions
    FOR INSERT WITH CHECK (
        customer_id IN (
            SELECT id FROM customers WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update own subscriptions" ON subscriptions
    FOR UPDATE USING (
        customer_id IN (
            SELECT id FROM customers WHERE user_id = auth.uid()
        )
    );

-- Payment history can only be viewed by the subscription owner
CREATE POLICY "Users can view own payment history" ON subscription_payments
    FOR SELECT USING (
        subscription_id IN (
            SELECT s.id FROM subscriptions s
            JOIN customers c ON s.customer_id = c.id
            WHERE c.user_id = auth.uid()
        )
    );

-- Subscription events can only be viewed by the subscription owner
CREATE POLICY "Users can view own subscription events" ON subscription_events
    FOR SELECT USING (
        subscription_id IN (
            SELECT s.id FROM subscriptions s
            JOIN customers c ON s.customer_id = c.id
            WHERE c.user_id = auth.uid()
        )
    );

-- Create helper functions for subscription management

-- Function to get customer by user ID
CREATE OR REPLACE FUNCTION get_customer_by_user_id(user_uuid UUID)
RETURNS customers AS $$
DECLARE
    customer_record customers;
BEGIN
    SELECT * INTO customer_record FROM customers WHERE user_id = user_uuid LIMIT 1;
    RETURN customer_record;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get active subscription for a customer
CREATE OR REPLACE FUNCTION get_active_subscription(customer_uuid UUID)
RETURNS subscriptions AS $$
DECLARE
    subscription_record subscriptions;
BEGIN
    SELECT * INTO subscription_record 
    FROM subscriptions 
    WHERE customer_id = customer_uuid 
    AND status = 'active' 
    ORDER BY created_at DESC 
    LIMIT 1;
    RETURN subscription_record;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create subscription event
CREATE OR REPLACE FUNCTION create_subscription_event(
    sub_id UUID,
    event_type_param VARCHAR(100),
    event_data_param JSONB DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    event_id UUID;
BEGIN
    INSERT INTO subscription_events (subscription_id, event_type, event_data)
    VALUES (sub_id, event_type_param, event_data_param)
    RETURNING id INTO event_id;
    
    RETURN event_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;