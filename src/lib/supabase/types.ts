export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      repair_tickets: {
        Row: {
          id: string
          ticket_number: string
          customer_first_name: string
          customer_last_name: string
          customer_phone: string
          customer_email: string
          device_type: string
          device_brand: string
          device_model: string
          issue_description: string
          status: 'received' | 'diagnosing' | 'awaiting-approval' | 'in-repair' | 'testing' | 'ready-pickup' | 'completed'
          estimated_completion: string | null
          total_cost: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          ticket_number: string
          customer_first_name: string
          customer_last_name: string
          customer_phone: string
          customer_email: string
          device_type: string
          device_brand: string
          device_model: string
          issue_description: string
          status?: 'received' | 'diagnosing' | 'awaiting-approval' | 'in-repair' | 'testing' | 'ready-pickup' | 'completed'
          estimated_completion?: string | null
          total_cost?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          ticket_number?: string
          customer_first_name?: string
          customer_last_name?: string
          customer_phone?: string
          customer_email?: string
          device_type?: string
          device_brand?: string
          device_model?: string
          issue_description?: string
          status?: 'received' | 'diagnosing' | 'awaiting-approval' | 'in-repair' | 'testing' | 'ready-pickup' | 'completed'
          estimated_completion?: string | null
          total_cost?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      status_timeline: {
        Row: {
          id: string
          ticket_id: string
          status: string
          timestamp: string
          notes: string | null
          technician_name: string | null
          created_at: string
        }
        Insert: {
          id?: string
          ticket_id: string
          status: string
          timestamp?: string
          notes?: string | null
          technician_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          ticket_id?: string
          status?: string
          timestamp?: string
          notes?: string | null
          technician_name?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "status_timeline_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "repair_tickets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      repair_status: 'received' | 'diagnosing' | 'awaiting-approval' | 'in-repair' | 'testing' | 'ready-pickup' | 'completed'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type RepairTicket = Database['public']['Tables']['repair_tickets']['Row']
export type RepairTicketInsert = Database['public']['Tables']['repair_tickets']['Insert']
export type RepairTicketUpdate = Database['public']['Tables']['repair_tickets']['Update']

export type StatusTimeline = Database['public']['Tables']['status_timeline']['Row']
export type StatusTimelineInsert = Database['public']['Tables']['status_timeline']['Insert']

export type RepairStatus = Database['public']['Enums']['repair_status']

// Utility type for repair ticket with timeline
export type RepairTicketWithTimeline = RepairTicket & {
  status_timeline: StatusTimeline[]
}