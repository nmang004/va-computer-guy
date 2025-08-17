declare module 'squareup' {
  export interface SquareConfig {
    environment: 'sandbox' | 'production'
    accessToken: string
    userAgentDetail?: string
  }

  export interface ApiError {
    category: string
    code: string
    detail?: string
    field?: string
  }

  export interface CreatePaymentRequest {
    sourceId: string
    amountMoney: {
      amount: bigint
      currency: string
    }
    idempotencyKey: string
    autocomplete?: boolean
    orderSource?: {
      name: string
    }
    note?: string
    buyerEmailAddress?: string
    locationId?: string
    customerId?: string
    referenceId?: string
    billingAddress?: {
      addressLine1?: string
      addressLine2?: string
      locality?: string
      administrativeDistrictLevel1?: string
      postalCode?: string
      country?: string
    }
    shippingAddress?: {
      addressLine1?: string
      addressLine2?: string
      locality?: string
      administrativeDistrictLevel1?: string
      postalCode?: string
      country?: string
    }
  }

  export interface Payment {
    id: string
    status: string
    receiptNumber?: string
    receiptUrl?: string
    amountMoney: {
      amount: bigint
      currency: string
    }
    createdAt: string
    updatedAt: string
  }

  export interface CreatePaymentResponse {
    result: {
      payment?: Payment
      errors?: ApiError[]
    }
  }

  export interface PaymentsApi {
    createPayment(body: CreatePaymentRequest): Promise<CreatePaymentResponse>
  }

  export interface CustomersApi {
    createCustomer(body: unknown): Promise<{ result: { customer?: unknown; errors?: ApiError[] } }>
  }

  export interface CatalogApi {
    upsertCatalogObject(body: unknown): Promise<{ result: { catalogObject?: unknown; errors?: ApiError[] } }>
  }

  export interface SubscriptionsApi {
    createSubscription(body: unknown): Promise<{ result: { subscription?: unknown; errors?: ApiError[] } }>
    updateSubscription(subscriptionId: string, body: unknown): Promise<{ result: { subscription?: unknown; errors?: ApiError[] } }>
    cancelSubscription(subscriptionId: string): Promise<{ result: { subscription?: unknown; errors?: ApiError[] } }>
    pauseSubscription(subscriptionId: string, body?: unknown): Promise<{ result: { subscription?: unknown; errors?: ApiError[] } }>
    resumeSubscription(subscriptionId: string, body?: unknown): Promise<{ result: { subscription?: unknown; errors?: ApiError[] } }>
    retrieveSubscription(subscriptionId: string): Promise<{ result: { subscription?: unknown; errors?: ApiError[] } }>
    searchSubscriptions(body: unknown): Promise<{ result: { subscriptions?: unknown[]; errors?: ApiError[] } }>
    listSubscriptionEvents(subscriptionId: string): Promise<{ result: { subscriptionEvents?: unknown[]; errors?: ApiError[] } }>
  }

  export interface ClientConfig {
    accessToken: string
    environment: 'sandbox' | 'production'
    userAgentDetail?: string
  }

  export class Client {
    constructor(config: ClientConfig)
    paymentsApi: PaymentsApi
    subscriptionsApi: SubscriptionsApi
    customersApi: CustomersApi
    catalogApi: CatalogApi
  }
}