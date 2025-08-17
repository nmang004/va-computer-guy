import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/database'
import { SquareService } from '@/lib/square'
import { ServerAuthService } from '@/lib/auth'

// GET /api/subscriptions/[id] - Get specific subscription
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await ServerAuthService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const subscription = await DatabaseService.getSubscription(params.id)
    if (!subscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
    }

    // Verify user owns this subscription
    const customer = await DatabaseService.getCustomerByUserId(user.id)
    if (!customer || subscription.customer_id !== customer.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    return NextResponse.json({ subscription })

  } catch (error) {
    console.error('Error fetching subscription:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    )
  }
}

// PATCH /api/subscriptions/[id] - Update subscription
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await ServerAuthService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { action, planId } = body

    const subscription = await DatabaseService.getSubscription(params.id)
    if (!subscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
    }

    // Verify user owns this subscription
    const customer = await DatabaseService.getCustomerByUserId(user.id)
    if (!customer || subscription.customer_id !== customer.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    let updatedSubscription

    switch (action) {
      case 'pause':
        if (subscription.square_subscription_id) {
          await SquareService.pauseSubscription(subscription.square_subscription_id)
        }
        updatedSubscription = await DatabaseService.updateSubscription(params.id, {
          status: 'paused'
        })
        await DatabaseService.createEvent({
          subscription_id: params.id,
          event_type: 'subscription_paused',
          event_data: { user_id: user.id }
        })
        break

      case 'resume':
        if (subscription.square_subscription_id) {
          await SquareService.resumeSubscription(subscription.square_subscription_id)
        }
        updatedSubscription = await DatabaseService.updateSubscription(params.id, {
          status: 'active'
        })
        await DatabaseService.createEvent({
          subscription_id: params.id,
          event_type: 'subscription_resumed',
          event_data: { user_id: user.id }
        })
        break

      case 'cancel':
        if (subscription.square_subscription_id) {
          await SquareService.cancelSubscription(subscription.square_subscription_id)
        }
        updatedSubscription = await DatabaseService.updateSubscription(params.id, {
          cancel_at_period_end: true,
          canceled_at: new Date().toISOString()
        })
        await DatabaseService.createEvent({
          subscription_id: params.id,
          event_type: 'subscription_canceled',
          event_data: { user_id: user.id, cancel_at_period_end: true }
        })
        break

      case 'change_plan':
        if (!planId) {
          return NextResponse.json({ error: 'Plan ID required' }, { status: 400 })
        }
        
        const newPlan = await DatabaseService.getSubscriptionPlan(planId)
        if (!newPlan) {
          return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
        }

        updatedSubscription = await DatabaseService.updateSubscription(params.id, {
          plan_id: planId
        })
        await DatabaseService.createEvent({
          subscription_id: params.id,
          event_type: 'plan_changed',
          event_data: { 
            user_id: user.id, 
            old_plan: subscription.plan_id,
            new_plan: planId 
          }
        })
        break

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    return NextResponse.json({ subscription: updatedSubscription })

  } catch (error: any) {
    console.error('Error updating subscription:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update subscription' },
      { status: 500 }
    )
  }
}

// DELETE /api/subscriptions/[id] - Cancel subscription immediately
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await ServerAuthService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const subscription = await DatabaseService.getSubscription(params.id)
    if (!subscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
    }

    // Verify user owns this subscription
    const customer = await DatabaseService.getCustomerByUserId(user.id)
    if (!customer || subscription.customer_id !== customer.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Cancel in Square if exists
    if (subscription.square_subscription_id) {
      await SquareService.cancelSubscription(subscription.square_subscription_id)
    }

    // Update subscription status
    const updatedSubscription = await DatabaseService.updateSubscription(params.id, {
      status: 'canceled',
      canceled_at: new Date().toISOString()
    })

    // Log event
    await DatabaseService.createEvent({
      subscription_id: params.id,
      event_type: 'subscription_canceled',
      event_data: { 
        user_id: user.id, 
        immediate_cancellation: true 
      }
    })

    return NextResponse.json({ 
      message: 'Subscription canceled successfully',
      subscription: updatedSubscription 
    })

  } catch (error: any) {
    console.error('Error canceling subscription:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to cancel subscription' },
      { status: 500 }
    )
  }
}