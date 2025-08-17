import { createClient } from './client'
import type { RepairTicket, RepairTicketWithTimeline } from './types'

export class RepairQueries {
  private supabase = createClient()

  /**
   * Find a repair ticket by ticket number and customer last name
   */
  async findTicketByNumberAndName(ticketNumber: string, lastName: string): Promise<RepairTicketWithTimeline | null> {
    const { data, error } = await this.supabase
      .from('repair_tickets')
      .select(`
        *,
        status_timeline (
          id,
          status,
          timestamp,
          notes,
          technician_name
        )
      `)
      .eq('ticket_number', ticketNumber.toUpperCase())
      .ilike('customer_last_name', lastName)
      .single()

    if (error) {
      console.error('Error finding ticket:', error)
      return null
    }

    return data as RepairTicketWithTimeline
  }

  /**
   * Get all repair tickets (for admin use)
   */
  async getAllTickets(): Promise<RepairTicket[]> {
    const { data, error } = await this.supabase
      .from('repair_tickets')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching all tickets:', error)
      return []
    }

    return data
  }

  /**
   * Update ticket status
   */
  async updateTicketStatus(
    ticketId: string, 
    status: RepairTicket['status'], 
    notes?: string,
    technicianName?: string
  ): Promise<boolean> {
    const { error: ticketError } = await this.supabase
      .from('repair_tickets')
      .update({ status })
      .eq('id', ticketId)

    if (ticketError) {
      console.error('Error updating ticket status:', ticketError)
      return false
    }

    // Add timeline entry with notes if provided
    if (notes || technicianName) {
      const { error: timelineError } = await this.supabase
        .from('status_timeline')
        .insert({
          ticket_id: ticketId,
          status: status,
          notes: notes || null,
          technician_name: technicianName || null,
          timestamp: new Date().toISOString()
        })

      if (timelineError) {
        console.error('Error adding timeline entry:', timelineError)
        // Don't return false here since the status update succeeded
      }
    }

    return true
  }

  /**
   * Create a new repair ticket
   */
  async createTicket(ticketData: {
    customerFirstName: string
    customerLastName: string
    customerPhone: string
    customerEmail: string
    deviceType: string
    deviceBrand: string
    deviceModel: string
    issueDescription: string
  }): Promise<RepairTicket | null> {
    // Generate ticket number
    const ticketNumber = await this.generateTicketNumber()

    const { data, error } = await this.supabase
      .from('repair_tickets')
      .insert({
        ticket_number: ticketNumber,
        customer_first_name: ticketData.customerFirstName,
        customer_last_name: ticketData.customerLastName,
        customer_phone: ticketData.customerPhone,
        customer_email: ticketData.customerEmail,
        device_type: ticketData.deviceType,
        device_brand: ticketData.deviceBrand,
        device_model: ticketData.deviceModel,
        issue_description: ticketData.issueDescription,
        status: 'received'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating ticket:', error)
      return null
    }

    return data
  }

  /**
   * Generate a unique ticket number in format VCG-YYYY-XXX
   */
  private async generateTicketNumber(): Promise<string> {
    const year = new Date().getFullYear()
    const prefix = `VCG-${year}-`

    // Get the highest ticket number for this year
    const { data, error } = await this.supabase
      .from('repair_tickets')
      .select('ticket_number')
      .like('ticket_number', `${prefix}%`)
      .order('ticket_number', { ascending: false })
      .limit(1)

    if (error) {
      console.error('Error generating ticket number:', error)
      // Fallback to 001 if we can't determine the latest
      return `${prefix}001`
    }

    if (data.length === 0) {
      // First ticket of the year
      return `${prefix}001`
    }

    // Extract the number and increment
    const lastTicket = data[0].ticket_number
    const lastNumber = parseInt(lastTicket.split('-')[2])
    const nextNumber = (lastNumber + 1).toString().padStart(3, '0')
    
    return `${prefix}${nextNumber}`
  }

  /**
   * Subscribe to real-time changes for a specific ticket
   */
  subscribeToTicket(ticketId: string, callback: (payload: unknown) => void) {
    return this.supabase
      .channel(`ticket-${ticketId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'repair_tickets',
          filter: `id=eq.${ticketId}`
        },
        callback
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'status_timeline',
          filter: `ticket_id=eq.${ticketId}`
        },
        callback
      )
      .subscribe()
  }
}

// Export a singleton instance
export const repairQueries = new RepairQueries()