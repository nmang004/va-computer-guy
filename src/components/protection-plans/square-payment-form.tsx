'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { CreditCard, Shield, Lock } from 'lucide-react'

declare global {
  interface Window {
    Square?: any
  }
}

interface SquarePaymentFormProps {
  amount: number
  onPaymentSuccess: (result: any) => void
  onPaymentError: (error: any) => void
  loading?: boolean
  disabled?: boolean
}

interface BillingAddress {
  line1: string
  line2: string
  city: string
  state: string
  zipCode: string
}

export function SquarePaymentForm({
  amount,
  onPaymentSuccess,
  onPaymentError,
  loading = false,
  disabled = false
}: SquarePaymentFormProps) {
  const cardContainerRef = useRef<HTMLDivElement>(null)
  const [payments, setPayments] = useState<any>(null)
  const [card, setCard] = useState<any>(null)
  const [isSquareLoaded, setIsSquareLoaded] = useState(false)
  const [cardComplete, setCardComplete] = useState(false)
  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    line1: '',
    line2: '',
    city: '',
    state: 'VA',
    zipCode: ''
  })
  const [useServiceAddress, setUseServiceAddress] = useState(true)

  // Load Square Web Payments SDK
  useEffect(() => {
    const loadSquareSDK = async () => {
      if (window.Square) {
        initializeSquare()
        return
      }

      const script = document.createElement('script')
      script.src = 'https://web.squarecdn.com/v1/square.js'
      script.onload = () => {
        setIsSquareLoaded(true)
        initializeSquare()
      }
      script.onerror = () => {
        onPaymentError(new Error('Failed to load Square SDK'))
      }
      document.head.appendChild(script)
    }

    loadSquareSDK()

    return () => {
      // Cleanup
      if (card) {
        card.destroy()
      }
    }
  }, [])

  const initializeSquare = async () => {
    if (!window.Square) {
      console.error('Square SDK not loaded')
      return
    }

    try {
      const payments = window.Square.payments(
        process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID,
        process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
      )
      setPayments(payments)

      const cardOptions = {
        style: {
          '.input-container': {
            borderColor: '#e5e7eb',
            borderRadius: '8px'
          },
          '.input-container.is-focus': {
            borderColor: '#3b82f6'
          },
          '.input-container.is-error': {
            borderColor: '#ef4444'
          },
          '.message-text': {
            color: '#6b7280'
          },
          '.message-text.is-error': {
            color: '#ef4444'
          }
        }
      }

      const cardElement = await payments.card(cardOptions)
      await cardElement.attach(cardContainerRef.current)
      setCard(cardElement)

      // Listen for card events
      cardElement.addEventListener('cardBrandChanged', (event: any) => {
        console.log('Card brand changed:', event.detail)
      })

      cardElement.addEventListener('errorClassAdded', (event: any) => {
        console.log('Card error:', event.detail)
      })

      cardElement.addEventListener('cardComplete', (event: any) => {
        setCardComplete(true)
      })

      cardElement.addEventListener('cardIncomplete', (event: any) => {
        setCardComplete(false)
      })

    } catch (error) {
      console.error('Error initializing Square:', error)
      onPaymentError(error)
    }
  }

  const handlePayment = async () => {
    if (!card || !payments) {
      onPaymentError(new Error('Payment form not initialized'))
      return
    }

    try {
      // Tokenize the card
      const result = await card.tokenize()
      
      if (result.status === 'OK') {
        // Create payment request
        const paymentRequest = {
          sourceId: result.token,
          amountMoney: {
            amount: BigInt(Math.round(amount * 100)), // Convert to cents
            currency: 'USD'
          },
          billingAddress: useServiceAddress ? undefined : {
            addressLine1: billingAddress.line1,
            addressLine2: billingAddress.line2,
            locality: billingAddress.city,
            administrativeDistrictLevel1: billingAddress.state,
            postalCode: billingAddress.zipCode,
            country: 'US'
          }
        }

        onPaymentSuccess({
          token: result.token,
          paymentRequest,
          billingAddress: useServiceAddress ? null : billingAddress
        })
      } else {
        onPaymentError(new Error(result.errors?.[0]?.message || 'Payment tokenization failed'))
      }
    } catch (error) {
      console.error('Payment error:', error)
      onPaymentError(error)
    }
  }

  const updateBillingAddress = (field: keyof BillingAddress, value: string) => {
    setBillingAddress(prev => ({ ...prev, [field]: value }))
  }

  const isFormValid = cardComplete && (useServiceAddress || (
    billingAddress.line1 && 
    billingAddress.city && 
    billingAddress.zipCode
  ))

  return (
    <div className="space-y-6">
      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total Amount:</span>
            <span>${amount.toFixed(2)}/month</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Your subscription will auto-renew monthly. Cancel anytime.
          </p>
        </CardContent>
      </Card>

      {/* Card Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
          <CardDescription>
            Enter your card information securely
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Square Card Element */}
          <div className="space-y-2">
            <Label htmlFor="card-container">Card Information</Label>
            <div 
              ref={cardContainerRef}
              id="card-container"
              className="min-h-[60px] border rounded-md p-3"
            >
              {!isSquareLoaded && (
                <div className="text-center text-muted-foreground">
                  Loading secure payment form...
                </div>
              )}
            </div>
          </div>

          {/* Billing Address Toggle */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="use-service-address"
              checked={useServiceAddress}
              onCheckedChange={(checked) => setUseServiceAddress(checked as boolean)}
            />
            <Label htmlFor="use-service-address" className="text-sm">
              Use service address for billing
            </Label>
          </div>

          {/* Billing Address Form */}
          {!useServiceAddress && (
            <div className="space-y-4 border-t pt-4">
              <h4 className="font-medium">Billing Address</h4>
              
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="billing-line1">Address Line 1</Label>
                  <Input
                    id="billing-line1"
                    value={billingAddress.line1}
                    onChange={(e) => updateBillingAddress('line1', e.target.value)}
                    placeholder="Street address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billing-line2">Address Line 2 (Optional)</Label>
                  <Input
                    id="billing-line2"
                    value={billingAddress.line2}
                    onChange={(e) => updateBillingAddress('line2', e.target.value)}
                    placeholder="Apt, suite, etc."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="billing-city">City</Label>
                    <Input
                      id="billing-city"
                      value={billingAddress.city}
                      onChange={(e) => updateBillingAddress('city', e.target.value)}
                      placeholder="City"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billing-zip">ZIP Code</Label>
                    <Input
                      id="billing-zip"
                      value={billingAddress.zipCode}
                      onChange={(e) => updateBillingAddress('zipCode', e.target.value)}
                      placeholder="ZIP"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <Shield className="h-4 w-4 text-green-600" />
            <div className="text-sm">
              <p className="font-medium">Secure Payment</p>
              <p className="text-muted-foreground">
                Your payment information is encrypted and secure
              </p>
            </div>
          </div>

          {/* Payment Button */}
          <Button
            onClick={handlePayment}
            disabled={!isFormValid || loading || disabled}
            className="w-full"
            size="lg"
          >
            {loading ? (
              'Processing...'
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Complete Payment - ${amount.toFixed(2)}/month
              </>
            )}
          </Button>

          {/* Terms */}
          <p className="text-xs text-muted-foreground text-center">
            By completing this payment, you agree to our{' '}
            <a href="/terms" className="underline hover:no-underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="underline hover:no-underline">
              Privacy Policy
            </a>
            . Your subscription will auto-renew monthly until cancelled.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

// Wrapper component for easier integration
interface PaymentFormWrapperProps {
  planPrice: number
  onSuccess: (paymentData: any) => void
  onError: (error: any) => void
  loading?: boolean
}

export function PaymentFormWrapper({
  planPrice,
  onSuccess,
  onError,
  loading = false
}: PaymentFormWrapperProps) {
  return (
    <SquarePaymentForm
      amount={planPrice}
      onPaymentSuccess={onSuccess}
      onPaymentError={onError}
      loading={loading}
    />
  )
}