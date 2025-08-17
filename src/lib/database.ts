import { createClient } from '@supabase/supabase-js'

// Types for our database schema
export interface Customer {
  id: string
  user_id: string
  email: string
  full_name: string
  phone?: string
  address?: string
  created_at: string
  updated_at: string
}

export interface SubscriptionPlan {
  id: string
  name: string
  description?: string
  plan_type: 'residential' | 'business'
  price_monthly: number
  features: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  customer_id: string
  plan_id: string
  square_subscription_id?: string
  status: 'pending' | 'active' | 'paused' | 'canceled' | 'expired'
  current_period_start?: string
  current_period_end?: string
  cancel_at_period_end: boolean
  canceled_at?: string
  created_at: string
  updated_at: string
}

export interface SubscriptionPayment {
  id: string
  subscription_id: string
  square_payment_id?: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  payment_date?: string
  failure_reason?: string
  created_at: string
  updated_at: string
}

export interface SubscriptionEvent {
  id: string
  subscription_id: string
  event_type: string
  event_data?: Record<string, unknown>
  created_at: string
}

// Database configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Create admin client for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database utility functions
export class DatabaseService {
  
  // Initialize database schema (run migrations)
  static async initializeSchema() {
    try {
      // This would typically be run as part of a deployment process
      // For now, users need to run the SQL migration manually
      console.log('Database schema should be initialized using the migration file')
      return { success: true }
    } catch (error) {
      console.error('Error initializing database schema:', error)
      return { success: false, error }
    }
  }

  // Customer operations
  static async createCustomer(customerData: Omit<Customer, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabaseAdmin
      .from('customers')
      .insert(customerData)
      .select()
      .single()
    
    if (error) throw error
    return data as Customer
  }

  static async getCustomerByUserId(userId: string) {
    const { data, error } = await supabaseAdmin
      .from('customers')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data as Customer | null
  }

  static async getCustomerByEmail(email: string) {
    const { data, error } = await supabaseAdmin
      .from('customers')
      .select('*')
      .eq('email', email)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data as Customer | null
  }

  // Subscription plan operations
  static async getSubscriptionPlans() {
    const { data, error } = await supabaseAdmin
      .from('subscription_plans')
      .select('*')
      .eq('is_active', true)
      .order('price_monthly', { ascending: true })
    
    if (error) throw error
    return data as SubscriptionPlan[]
  }

  static async getSubscriptionPlan(planId: string) {
    const { data, error } = await supabaseAdmin
      .from('subscription_plans')
      .select('*')
      .eq('id', planId)
      .single()
    
    if (error) throw error
    return data as SubscriptionPlan
  }

  // Subscription operations
  static async createSubscription(subscriptionData: Omit<Subscription, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabaseAdmin
      .from('subscriptions')
      .insert(subscriptionData)
      .select()
      .single()
    
    if (error) throw error
    return data as Subscription
  }

  static async updateSubscription(subscriptionId: string, updates: Partial<Subscription>) {
    const { data, error } = await supabaseAdmin
      .from('subscriptions')
      .update(updates)
      .eq('id', subscriptionId)
      .select()
      .single()
    
    if (error) throw error
    return data as Subscription
  }

  static async getSubscription(subscriptionId: string) {
    const { data, error } = await supabaseAdmin
      .from('subscriptions')
      .select(`
        *,
        customer:customers(*),
        plan:subscription_plans(*)
      `)
      .eq('id', subscriptionId)
      .single()
    
    if (error) throw error
    return data
  }

  static async getCustomerSubscriptions(customerId: string) {
    const { data, error } = await supabaseAdmin
      .from('subscriptions')
      .select(`
        *,
        plan:subscription_plans(*)
      `)
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }

  static async getActiveSubscription(customerId: string) {
    const { data, error } = await supabaseAdmin
      .from('subscriptions')
      .select(`
        *,
        plan:subscription_plans(*)
      `)
      .eq('customer_id', customerId)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  }

  // Payment operations
  static async createPayment(paymentData: Omit<SubscriptionPayment, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabaseAdmin
      .from('subscription_payments')
      .insert(paymentData)
      .select()
      .single()
    
    if (error) throw error
    return data as SubscriptionPayment
  }

  static async updatePayment(paymentId: string, updates: Partial<SubscriptionPayment>) {
    const { data, error } = await supabaseAdmin
      .from('subscription_payments')
      .update(updates)
      .eq('id', paymentId)
      .select()
      .single()
    
    if (error) throw error
    return data as SubscriptionPayment
  }

  static async getPaymentHistory(subscriptionId: string) {
    const { data, error } = await supabaseAdmin
      .from('subscription_payments')
      .select('*')
      .eq('subscription_id', subscriptionId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as SubscriptionPayment[]
  }

  // Event logging
  static async createEvent(eventData: Omit<SubscriptionEvent, 'id' | 'created_at'>) {
    const { data, error } = await supabaseAdmin
      .from('subscription_events')
      .insert(eventData)
      .select()
      .single()
    
    if (error) throw error
    return data as SubscriptionEvent
  }

  static async getSubscriptionEvents(subscriptionId: string) {
    const { data, error } = await supabaseAdmin
      .from('subscription_events')
      .select('*')
      .eq('subscription_id', subscriptionId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as SubscriptionEvent[]
  }
}