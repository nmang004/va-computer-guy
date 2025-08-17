import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/database'
import { SquareService } from '@/lib/square'
import { ServerAuthService } from '@/lib/auth-server'

// GET /api/subscriptions - Get user's subscriptions
export async function GET(_request: NextRequest) {
  try {
    const user = await ServerAuthService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const customer = await DatabaseService.getCustomerByUserId(user.id)
    if (!customer) {
      return NextResponse.json({ subscriptions: [] })
    }

    const subscriptions = await DatabaseService.getCustomerSubscriptions(customer.id)
    return NextResponse.json({ subscriptions })

  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions' },
      { status: 500 }
    )
  }
}

// POST /api/subscriptions - Create new subscription
export async function POST(request: NextRequest) {
  try {
    const user = await ServerAuthService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { planId, paymentToken, customerInfo } = body

    // Validate required fields
    if (!planId || !paymentToken || !customerInfo) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get or create customer
    let customer = await DatabaseService.getCustomerByUserId(user.id)
    
    if (!customer) {
      customer = await DatabaseService.createCustomer({
        user_id: user.id,
        email: customerInfo.email,
        full_name: customerInfo.fullName,
        phone: customerInfo.phone,
        address: JSON.stringify(customerInfo.address)
      })
    }

    // Get subscription plan
    const plan = await DatabaseService.getSubscriptionPlan(planId)
    if (!plan) {
      return NextResponse.json(
        { error: 'Invalid subscription plan' },
        { status: 400 }
      )
    }

    // Create Square customer if needed
    const squareCustomer = await SquareService.createCustomer({
      email: customerInfo.email,
      givenName: customerInfo.fullName.split(' ')[0],
      familyName: customerInfo.fullName.split(' ').slice(1).join(' '),
      phoneNumber: customerInfo.phone,
      address: customerInfo.address
    })

    // Create subscription in database
    const subscription = await DatabaseService.createSubscription({
      customer_id: customer.id,
      plan_id: planId,
      status: 'pending',
      cancel_at_period_end: false
    })

    // Create initial payment
    const paymentResult = await SquareService.createPayment({
      sourceId: paymentToken,
      amountMoney: {
        amount: BigInt(Math.round(plan.price_monthly * 100)),
        currency: 'USD'
      },
      customerId: squareCustomer?.id,
      referenceId: subscription.id,
      note: `${plan.name} - First Payment`
    })

    if (paymentResult?.status === 'COMPLETED') {
      // Update subscription status
      await DatabaseService.updateSubscription(subscription.id, {
        status: 'active',
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      })

      // Log payment
      await DatabaseService.createPayment({
        subscription_id: subscription.id,
        square_payment_id: paymentResult.id,
        amount: plan.price_monthly,
        currency: 'USD',
        status: 'completed',
        payment_date: new Date().toISOString()
      })

      // Log event
      await DatabaseService.createEvent({
        subscription_id: subscription.id,
        event_type: 'payment_succeeded',
        event_data: {
          amount: plan.price_monthly,
          payment_id: paymentResult.id
        }
      })
    }

    return NextResponse.json({
      subscription,
      payment: paymentResult
    })

  } catch (error: unknown) {
    console.error('Error creating subscription:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create subscription' },
      { status: 500 }
    )
  }
}