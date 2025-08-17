import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { RepairTicketWithTimeline } from '@/lib/supabase/types'

export async function POST(request: NextRequest) {
  try {
    const { ticketNumber, lastName } = await request.json()

    // Validate input
    if (!ticketNumber || !lastName) {
      return NextResponse.json(
        { error: 'Ticket number and last name are required' },
        { status: 400 }
      )
    }

    // Create Supabase client
    const supabase = await createClient()

    // Query the database
    const { data, error } = await supabase
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
      .eq('ticket_number', ticketNumber.toUpperCase().trim())
      .ilike('customer_last_name', lastName.trim())
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return NextResponse.json(
          { error: 'No repair found with that ticket number and last name' },
          { status: 404 }
        )
      }
      
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Unable to search for repair ticket' },
        { status: 500 }
      )
    }

    // Sort timeline by timestamp
    const sortedData = {
      ...data,
      status_timeline: data.status_timeline.sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      )
    } as RepairTicketWithTimeline

    return NextResponse.json({ ticket: sortedData })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}