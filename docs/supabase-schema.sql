-- Create enum for repair status
CREATE TYPE repair_status AS ENUM (
  'received',
  'diagnosing', 
  'awaiting-approval',
  'in-repair',
  'testing',
  'ready-pickup',
  'completed'
);

-- Create repair_tickets table
CREATE TABLE repair_tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_number VARCHAR(20) UNIQUE NOT NULL,
  customer_first_name VARCHAR(100) NOT NULL,
  customer_last_name VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  device_type VARCHAR(50) NOT NULL,
  device_brand VARCHAR(50) NOT NULL,
  device_model VARCHAR(100) NOT NULL,
  issue_description TEXT NOT NULL,
  status repair_status DEFAULT 'received' NOT NULL,
  estimated_completion TIMESTAMPTZ NULL,
  total_cost DECIMAL(10,2) NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create status_timeline table for tracking status changes
CREATE TABLE status_timeline (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID REFERENCES repair_tickets(id) ON DELETE CASCADE NOT NULL,
  status VARCHAR(50) NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  notes TEXT NULL,
  technician_name VARCHAR(100) NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_repair_tickets_ticket_number ON repair_tickets(ticket_number);
CREATE INDEX idx_repair_tickets_status ON repair_tickets(status);
CREATE INDEX idx_repair_tickets_customer_last_name ON repair_tickets(customer_last_name);
CREATE INDEX idx_status_timeline_ticket_id ON status_timeline(ticket_id);
CREATE INDEX idx_status_timeline_timestamp ON status_timeline(timestamp);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_repair_tickets_updated_at 
  BEFORE UPDATE ON repair_tickets 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to automatically add status timeline entry when ticket status changes
CREATE OR REPLACE FUNCTION add_status_timeline_entry()
RETURNS TRIGGER AS $$
BEGIN
  -- Only add timeline entry if status actually changed
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO status_timeline (ticket_id, status, timestamp)
    VALUES (NEW.id, NEW.status::text, NOW());
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for automatic timeline entries
CREATE TRIGGER add_status_timeline_on_update
  AFTER UPDATE OF status ON repair_tickets
  FOR EACH ROW EXECUTE FUNCTION add_status_timeline_entry();

-- Create initial timeline entry for new tickets
CREATE OR REPLACE FUNCTION add_initial_timeline_entry()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO status_timeline (ticket_id, status, timestamp)
  VALUES (NEW.id, NEW.status::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for initial timeline entry
CREATE TRIGGER add_initial_timeline_on_insert
  AFTER INSERT ON repair_tickets
  FOR EACH ROW EXECUTE FUNCTION add_initial_timeline_entry();

-- Enable Row Level Security (RLS)
ALTER TABLE repair_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_timeline ENABLE ROW LEVEL SECURITY;

-- Create policy for customers to view their own tickets
CREATE POLICY "Customers can view their own tickets" ON repair_tickets
  FOR SELECT USING (true); -- For now, allow all reads (we'll validate in application layer)

-- Create policy for customers to view timeline for their tickets
CREATE POLICY "Customers can view timeline for their tickets" ON status_timeline
  FOR SELECT USING (true); -- For now, allow all reads (we'll validate in application layer)

-- Insert sample data for testing
INSERT INTO repair_tickets (
  ticket_number, 
  customer_first_name, 
  customer_last_name, 
  customer_phone, 
  customer_email,
  device_type, 
  device_brand, 
  device_model, 
  issue_description,
  status
) VALUES 
(
  'VCG-2025-001',
  'John',
  'Smith',
  '(757) 555-0123',
  'john.smith@email.com',
  'laptop',
  'Dell',
  'Inspiron 15 3000',
  'Laptop screen is completely black when powered on. Power light comes on but no display.',
  'diagnosing'
),
(
  'VCG-2025-002',
  'Sarah',
  'Johnson',
  '(757) 555-0456',
  'sarah.j@email.com',
  'desktop',
  'HP',
  'Pavilion Desktop',
  'Computer is very slow, takes 10+ minutes to boot up. Multiple pop-ups appearing.',
  'in-repair'
),
(
  'VCG-2025-003',
  'Mike',
  'Davis',
  '(757) 555-0789',
  'mike.davis@email.com',
  'mac',
  'Apple',
  'MacBook Pro 13"',
  'Spilled coffee on keyboard. Several keys not working and trackpad is sticky.',
  'ready-pickup'
);

-- Add some manual timeline entries for the sample data to show progression
INSERT INTO status_timeline (ticket_id, status, timestamp, notes, technician_name) 
SELECT 
  rt.id,
  'received',
  rt.created_at,
  'Device received and logged into system',
  'Tech Support'
FROM repair_tickets rt WHERE rt.ticket_number = 'VCG-2025-001';

INSERT INTO status_timeline (ticket_id, status, timestamp, notes, technician_name) 
SELECT 
  rt.id,
  'diagnosing',
  rt.created_at + INTERVAL '2 hours',
  'Initial diagnosis in progress. Testing power supply and display connections.',
  'Mike T.'
FROM repair_tickets rt WHERE rt.ticket_number = 'VCG-2025-001';

-- Update estimated completion for the sample tickets
UPDATE repair_tickets 
SET estimated_completion = NOW() + INTERVAL '2 days'
WHERE ticket_number = 'VCG-2025-001';

UPDATE repair_tickets 
SET estimated_completion = NOW() + INTERVAL '1 day',
    total_cost = 125.00
WHERE ticket_number = 'VCG-2025-002';

UPDATE repair_tickets 
SET total_cost = 189.50
WHERE ticket_number = 'VCG-2025-003';