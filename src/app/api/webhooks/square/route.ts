import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/database'
import { SquareService } from '@/lib/square'

// Define webhook event types (currently unused but kept for future reference)
// interface WebhookEvent {
//   type: string
//   data: {
//     type: string
//     id: string
//     object: Record<string, unknown>
//   }
// }

interface SquarePayment {
  id: string
  reference_id?: string
  status?: string
  amount_money?: {
    amount: number
    currency: string
  }
  delay_action?: {
    type: string
  }
}

interface SquareSubscription {
  id: string
  status?: string
  invoice_request_date?: string
}

// POST /api/webhooks/square - Handle Square webhook events
export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-square-signature') || ''
    const webhookSignatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY || ''

    // Verify webhook signature
    if (!SquareService.verifyWebhookSignature(body, signature, webhookSignatureKey)) {
      console.error('Invalid webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(body)
    console.log('Square webhook event:', event.type)

    switch (event.type) {
      case 'payment.created':
        await handlePaymentCreated(event.data.object.payment)
        break

      case 'payment.updated':
        await handlePaymentUpdated(event.data.object.payment)
        break

      case 'subscription.created':
        await handleSubscriptionCreated(event.data.object.subscription)
        break

      case 'subscription.updated':
        await handleSubscriptionUpdated(event.data.object.subscription)
        break

      case 'invoice.payment_made':
        await handleInvoicePaymentMade(event.data.object.invoice)
        break

      case 'invoice.failed':
        await handleInvoiceFailed(event.data.object.invoice)
        break

      default:
        console.log('Unhandled webhook event:', event.type)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function handlePaymentCreated(payment: SquarePayment) {
  try {
    console.log('Processing payment created:', payment.id)

    if (payment.reference_id) {
      // This is a subscription payment - find the subscription
      const subscription = await DatabaseService.getSubscription(payment.reference_id)
      
      if (subscription) {
        // Log the payment
        await DatabaseService.createPayment({
          subscription_id: subscription.id,
          square_payment_id: payment.id,
          amount: payment.amount_money ? Number(payment.amount_money.amount) / 100 : 0,
          currency: payment.amount_money?.currency || 'USD',
          status: payment.status === 'COMPLETED' ? 'completed' : 'pending',
          payment_date: new Date().toISOString()
        })

        // Log event
        await DatabaseService.createEvent({
          subscription_id: subscription.id,
          event_type: 'payment_created',
          event_data: {
            payment_id: payment.id,
            amount: payment.amount_money ? Number(payment.amount_money.amount) / 100 : 0,
            status: payment.status
          }
        })
      }
    }
  } catch (error) {
    console.error('Error handling payment created:', error)
  }
}

async function handlePaymentUpdated(payment: SquarePayment) {
  try {
    console.log('Processing payment updated:', payment.id)

    // Find the payment in our database
    const existingPayments = await DatabaseService.getPaymentHistory(payment.reference_id || '')
    const existingPayment = existingPayments.find(p => p.square_payment_id === payment.id)

    if (existingPayment) {
      // Update payment status
      await DatabaseService.updatePayment(existingPayment.id, {
        status: payment.status === 'COMPLETED' ? 'completed' : 
               payment.status === 'FAILED' ? 'failed' : 'pending'
      })

      // Log event
      await DatabaseService.createEvent({
        subscription_id: existingPayment.subscription_id,
        event_type: payment.status === 'COMPLETED' ? 'payment_succeeded' : 'payment_failed',
        event_data: {
          payment_id: payment.id,
          amount: payment.amount_money ? Number(payment.amount_money.amount) / 100 : 0,
          status: payment.status
        }
      })

      // If payment failed, handle accordingly
      if (payment.status === 'FAILED') {
        await handleFailedPayment(existingPayment.subscription_id, payment)
      }
    }
  } catch (error) {
    console.error('Error handling payment updated:', error)
  }
}

async function handleSubscriptionCreated(subscription: SquareSubscription) {
  try {
    console.log('Processing subscription created:', subscription.id)

    // Find subscription in our database and update with Square subscription ID
    // This would typically be done during the initial creation process
    // But this webhook provides confirmation

    // Log event for any subscriptions that match
    // Implementation depends on how we track Square subscription IDs
  } catch (error) {
    console.error('Error handling subscription created:', error)
  }
}

async function handleSubscriptionUpdated(subscription: SquareSubscription) {
  try {
    console.log('Processing subscription updated:', subscription.id)

    // Handle subscription status changes from Square
    // Update our database accordingly
    
    // This would require storing the Square subscription ID in our database
    // and looking up subscriptions by that ID
  } catch (error) {
    console.error('Error handling subscription updated:', error)
  }
}

async function handleInvoicePaymentMade(invoice: Record<string, unknown>) {
  try {
    console.log('Processing invoice payment made:', invoice.id)
    
    // Handle successful recurring payment
    if (invoice.subscription_plan_id) {
      // Find subscription and log successful payment
      // Update next billing date
    }
  } catch (error) {
    console.error('Error handling invoice payment made:', error)
  }
}

async function handleInvoiceFailed(invoice: Record<string, unknown>) {
  try {
    console.log('Processing invoice failed:', invoice.id)
    
    // Handle failed recurring payment
    if (invoice.subscription_plan_id) {
      // Find subscription and handle failed payment
      // Send notification to customer
      // Update subscription status if needed
    }
  } catch (error) {
    console.error('Error handling invoice failed:', error)
  }
}

async function handleFailedPayment(subscriptionId: string, payment: SquarePayment) {
  try {
    // Get subscription details
    const subscription = await DatabaseService.getSubscription(subscriptionId)
    if (!subscription) return

    // Log failed payment event
    await DatabaseService.createEvent({
      subscription_id: subscriptionId,
      event_type: 'payment_failed',
      event_data: {
        payment_id: payment.id,
        amount: payment.amount_money ? Number(payment.amount_money.amount) / 100 : 0,
        failure_reason: payment.delay_action?.type || 'Unknown'
      }
    })

    // TODO: Send email notification to customer about failed payment
    // TODO: Implement retry logic or suspension of service after multiple failures
    
  } catch (error) {
    console.error('Error handling failed payment:', error)
  }
}