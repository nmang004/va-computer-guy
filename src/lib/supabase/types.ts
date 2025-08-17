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
      support_tickets: {
        Row: {
          id: string
          customer_id: string | null
          customer_email: string
          customer_name: string
          subject: string
          description: string
          status: 'open' | 'in-progress' | 'waiting-customer' | 'resolved' | 'closed'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          category: 'technical' | 'billing' | 'general' | 'repair-status' | 'protection-plan'
          assigned_to: string | null
          related_repair_ticket: string | null
          created_at: string
          updated_at: string
          closed_at: string | null
        }
        Insert: {
          id?: string
          customer_id?: string | null
          customer_email: string
          customer_name: string
          subject: string
          description: string
          status?: 'open' | 'in-progress' | 'waiting-customer' | 'resolved' | 'closed'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          category?: 'technical' | 'billing' | 'general' | 'repair-status' | 'protection-plan'
          assigned_to?: string | null
          related_repair_ticket?: string | null
          created_at?: string
          updated_at?: string
          closed_at?: string | null
        }
        Update: {
          id?: string
          customer_id?: string | null
          customer_email?: string
          customer_name?: string
          subject?: string
          description?: string
          status?: 'open' | 'in-progress' | 'waiting-customer' | 'resolved' | 'closed'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          category?: 'technical' | 'billing' | 'general' | 'repair-status' | 'protection-plan'
          assigned_to?: string | null
          related_repair_ticket?: string | null
          created_at?: string
          updated_at?: string
          closed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_related_repair_ticket_fkey"
            columns: ["related_repair_ticket"]
            isOneToOne: false
            referencedRelation: "repair_tickets"
            referencedColumns: ["id"]
          }
        ]
      }
      chat_messages: {
        Row: {
          id: string
          support_ticket_id: string
          sender_type: 'customer' | 'staff' | 'system'
          sender_name: string
          sender_email: string | null
          message: string
          attachments: Json | null
          is_internal: boolean
          created_at: string
        }
        Insert: {
          id?: string
          support_ticket_id: string
          sender_type: 'customer' | 'staff' | 'system'
          sender_name: string
          sender_email?: string | null
          message: string
          attachments?: Json | null
          is_internal?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          support_ticket_id?: string
          sender_type?: 'customer' | 'staff' | 'system'
          sender_name?: string
          sender_email?: string | null
          message?: string
          attachments?: Json | null
          is_internal?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_support_ticket_id_fkey"
            columns: ["support_ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          }
        ]
      }
      kb_articles: {
        Row: {
          id: string
          category: string
          title: string
          slug: string
          excerpt: string
          content: string
          tags: string[] | null
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          read_time: string
          helpful_count: number
          not_helpful_count: number
          view_count: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category: string
          title: string
          slug: string
          excerpt: string
          content: string
          tags?: string[] | null
          difficulty?: 'beginner' | 'intermediate' | 'advanced'
          read_time?: string
          helpful_count?: number
          not_helpful_count?: number
          view_count?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category?: string
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          tags?: string[] | null
          difficulty?: 'beginner' | 'intermediate' | 'advanced'
          read_time?: string
          helpful_count?: number
          not_helpful_count?: number
          view_count?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
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
      support_status: 'open' | 'in-progress' | 'waiting-customer' | 'resolved' | 'closed'
      support_priority: 'low' | 'medium' | 'high' | 'urgent'
      support_category: 'technical' | 'billing' | 'general' | 'repair-status' | 'protection-plan'
      article_difficulty: 'beginner' | 'intermediate' | 'advanced'
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

export type SupportTicket = Database['public']['Tables']['support_tickets']['Row']
export type SupportTicketInsert = Database['public']['Tables']['support_tickets']['Insert']
export type SupportTicketUpdate = Database['public']['Tables']['support_tickets']['Update']

export type ChatMessage = Database['public']['Tables']['chat_messages']['Row']
export type ChatMessageInsert = Database['public']['Tables']['chat_messages']['Insert']
export type ChatMessageUpdate = Database['public']['Tables']['chat_messages']['Update']

export type KbArticle = Database['public']['Tables']['kb_articles']['Row']
export type KbArticleInsert = Database['public']['Tables']['kb_articles']['Insert']
export type KbArticleUpdate = Database['public']['Tables']['kb_articles']['Update']

export type RepairStatus = Database['public']['Enums']['repair_status']
export type SupportStatus = Database['public']['Enums']['support_status']
export type SupportPriority = Database['public']['Enums']['support_priority']
export type SupportCategory = Database['public']['Enums']['support_category']
export type ArticleDifficulty = Database['public']['Enums']['article_difficulty']

// Utility types
export type RepairTicketWithTimeline = RepairTicket & {
  status_timeline: StatusTimeline[]
}

export type SupportTicketWithMessages = SupportTicket & {
  chat_messages: ChatMessage[]
}

export type SupportTicketWithRepair = SupportTicket & {
  repair_ticket?: RepairTicket
}