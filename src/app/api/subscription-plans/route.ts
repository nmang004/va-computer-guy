import { NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/database'

// GET /api/subscription-plans - Get all active subscription plans
export async function GET() {
  try {
    const plans = await DatabaseService.getSubscriptionPlans()
    return NextResponse.json({ plans })

  } catch (error) {
    console.error('Error fetching subscription plans:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription plans' },
      { status: 500 }
    )
  }
}