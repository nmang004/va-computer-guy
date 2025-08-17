import { Client, Environment } from 'squareup'
import crypto from 'crypto'

// Initialize Square client
const environment = process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT === 'production' 
  ? Environment.Production 
  : Environment.Sandbox

export const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment
})

// Square API service for subscription management
export class SquareService {
  
  // Get the configured location ID
  static getLocationId(): string {
    return process.env.SQUARE_LOCATION_ID || 'main'
  }

  // Create a customer in Square
  static async createCustomer(customerData: {
    email: string
    givenName: string
    familyName?: string
    phoneNumber?: string
    address?: {
      addressLine1?: string
      addressLine2?: string
      locality?: string
      administrativeDistrictLevel1?: string
      postalCode?: string
      country?: string
    }
  }) {
    try {
      const { customersApi } = squareClient
      
      const requestBody = {
        givenName: customerData.givenName,
        familyName: customerData.familyName || '',
        emailAddress: customerData.email,
        phoneNumber: customerData.phoneNumber,
        address: customerData.address
      }

      const response = await customersApi.createCustomer(requestBody)
      
      if (response.result.errors && response.result.errors.length > 0) {
        throw new Error(`Square API Error: ${response.result.errors[0].detail}`)
      }

      return response.result.customer
    } catch (error) {
      console.error('Error creating Square customer:', error)
      throw error
    }
  }

  // Create a subscription plan in Square
  static async createSubscriptionPlan(planData: {
    name: string
    planType: 'residential' | 'business'
    priceMonthly: number
  }) {
    try {
      const { catalogApi } = squareClient
      
      const subscriptionPlanObject = {
        type: 'SUBSCRIPTION_PLAN',
        id: `#${planData.planType.toUpperCase()}_PLAN`,
        subscriptionPlanData: {
          name: planData.name,
          phases: [
            {
              cadence: 'MONTHLY',
              recurringPriceMoney: {
                amount: BigInt(Math.round(planData.priceMonthly * 100)), // Convert to cents
                currency: 'USD'
              }
            }
          ]
        }
      }

      const requestBody = {
        idempotencyKey: crypto.randomUUID(),
        object: subscriptionPlanObject
      }

      const response = await catalogApi.upsertCatalogObject(requestBody)
      
      if (response.result.errors && response.result.errors.length > 0) {
        throw new Error(`Square API Error: ${response.result.errors[0].detail}`)
      }

      return response.result.catalogObject
    } catch (error) {
      console.error('Error creating subscription plan:', error)
      throw error
    }
  }

  // Create a subscription
  static async createSubscription(subscriptionData: {
    customerId: string
    planVariationId: string
    locationId?: string
    startDate?: string
  }) {
    try {
      const { subscriptionsApi } = squareClient
      
      const requestBody = {
        idempotencyKey: crypto.randomUUID(),
        locationId: subscriptionData.locationId || this.getLocationId(),
        planVariationId: subscriptionData.planVariationId,
        customerId: subscriptionData.customerId,
        startDate: subscriptionData.startDate || new Date().toISOString().split('T')[0],
        timezone: 'America/New_York'
      }

      const response = await subscriptionsApi.createSubscription(requestBody)
      
      if (response.result.errors && response.result.errors.length > 0) {
        throw new Error(`Square API Error: ${response.result.errors[0].detail}`)
      }

      return response.result.subscription
    } catch (error) {
      console.error('Error creating subscription:', error)
      throw error
    }
  }

  // Retrieve a subscription
  static async getSubscription(subscriptionId: string) {
    try {
      const { subscriptionsApi } = squareClient
      
      const response = await subscriptionsApi.retrieveSubscription(subscriptionId)
      
      if (response.result.errors && response.result.errors.length > 0) {
        throw new Error(`Square API Error: ${response.result.errors[0].detail}`)
      }

      return response.result.subscription
    } catch (error) {
      console.error('Error retrieving subscription:', error)
      throw error
    }
  }

  // Update a subscription
  static async updateSubscription(subscriptionId: string, updateData: {
    planVariationId?: string
    priceOverrideMoney?: { amount: bigint; currency: string }
  }) {
    try {
      const { subscriptionsApi } = squareClient
      
      const requestBody = {
        subscription: {
          planVariationId: updateData.planVariationId,
          priceOverrideMoney: updateData.priceOverrideMoney
        }
      }

      const response = await subscriptionsApi.updateSubscription(subscriptionId, requestBody)
      
      if (response.result.errors && response.result.errors.length > 0) {
        throw new Error(`Square API Error: ${response.result.errors[0].detail}`)
      }

      return response.result.subscription
    } catch (error) {
      console.error('Error updating subscription:', error)
      throw error
    }
  }

  // Cancel a subscription
  static async cancelSubscription(subscriptionId: string) {
    try {
      const { subscriptionsApi } = squareClient
      
      const response = await subscriptionsApi.cancelSubscription(subscriptionId)
      
      if (response.result.errors && response.result.errors.length > 0) {
        throw new Error(`Square API Error: ${response.result.errors[0].detail}`)
      }

      return response.result.subscription
    } catch (error) {
      console.error('Error canceling subscription:', error)
      throw error
    }
  }

  // Pause a subscription
  static async pauseSubscription(subscriptionId: string, pauseReason?: string) {
    try {
      const { subscriptionsApi } = squareClient
      
      const requestBody = {
        pauseReason: pauseReason || 'Customer requested pause'
      }

      const response = await subscriptionsApi.pauseSubscription(subscriptionId, requestBody)
      
      if (response.result.errors && response.result.errors.length > 0) {
        throw new Error(`Square API Error: ${response.result.errors[0].detail}`)
      }

      return response.result.subscription
    } catch (error) {
      console.error('Error pausing subscription:', error)
      throw error
    }
  }

  // Resume a subscription
  static async resumeSubscription(subscriptionId: string, resumeReason?: string) {
    try {
      const { subscriptionsApi } = squareClient
      
      const requestBody = {
        resumeReason: resumeReason || 'Customer requested resume'
      }

      const response = await subscriptionsApi.resumeSubscription(subscriptionId, requestBody)
      
      if (response.result.errors && response.result.errors.length > 0) {
        throw new Error(`Square API Error: ${response.result.errors[0].detail}`)
      }

      return response.result.subscription
    } catch (error) {
      console.error('Error resuming subscription:', error)
      throw error
    }
  }

  // Search for subscriptions (for admin use)
  static async searchSubscriptions(filter?: {
    locationIds?: string[]
    customerIds?: string[]
    planIds?: string[]
  }) {
    try {
      const { subscriptionsApi } = squareClient
      
      const requestBody = {
        query: {
          filter: {
            locationIds: filter?.locationIds || [this.getLocationId()],
            customerIds: filter?.customerIds,
            planIds: filter?.planIds
          }
        }
      }

      const response = await subscriptionsApi.searchSubscriptions(requestBody)
      
      if (response.result.errors && response.result.errors.length > 0) {
        throw new Error(`Square API Error: ${response.result.errors[0].detail}`)
      }

      return response.result.subscriptions || []
    } catch (error) {
      console.error('Error searching subscriptions:', error)
      throw error
    }
  }

  // List subscription events (for audit trail)
  static async listSubscriptionEvents(subscriptionId: string) {
    try {
      const { subscriptionsApi } = squareClient
      
      const response = await subscriptionsApi.listSubscriptionEvents(subscriptionId)
      
      if (response.result.errors && response.result.errors.length > 0) {
        throw new Error(`Square API Error: ${response.result.errors[0].detail}`)
      }

      return response.result.subscriptionEvents || []
    } catch (error) {
      console.error('Error listing subscription events:', error)
      throw error
    }
  }

  // Create a payment (for one-time charges)
  static async createPayment(paymentData: {
    sourceId: string
    amountMoney: { amount: bigint; currency: string }
    customerId?: string
    locationId?: string
    referenceId?: string
    note?: string
  }) {
    try {
      const { paymentsApi } = squareClient
      
      const requestBody = {
        sourceId: paymentData.sourceId,
        idempotencyKey: crypto.randomUUID(),
        amountMoney: paymentData.amountMoney,
        customerId: paymentData.customerId,
        locationId: paymentData.locationId || this.getLocationId(),
        referenceId: paymentData.referenceId,
        note: paymentData.note
      }

      const response = await paymentsApi.createPayment(requestBody)
      
      if (response.result.errors && response.result.errors.length > 0) {
        throw new Error(`Square API Error: ${response.result.errors[0].detail}`)
      }

      return response.result.payment
    } catch (error) {
      console.error('Error creating payment:', error)
      throw error
    }
  }

  // Verify webhook signature
  static verifyWebhookSignature(
    requestBody: string,
    signatureHeader: string,
    webhookSignatureKey: string
  ): boolean {
    try {
      const hmac = crypto.createHmac('sha256', webhookSignatureKey)
      hmac.update(requestBody)
      const expectedSignature = hmac.digest('base64')
      
      return crypto.timingSafeEqual(
        Buffer.from(signatureHeader),
        Buffer.from(expectedSignature)
      )
    } catch (error) {
      console.error('Error verifying webhook signature:', error)
      return false
    }
  }
}

// Helper function to format money for display
export function formatMoney(amount: bigint | number, currency: string = 'USD'): string {
  const numAmount = typeof amount === 'bigint' ? Number(amount) : amount
  const dollars = numAmount / 100
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(dollars)
}

// Helper function to convert dollars to cents for Square API
export function dollarsToSquareAmount(dollars: number): bigint {
  return BigInt(Math.round(dollars * 100))
}

// Helper function to convert Square amount to dollars
export function squareAmountToDollars(amount: bigint): number {
  return Number(amount) / 100
}