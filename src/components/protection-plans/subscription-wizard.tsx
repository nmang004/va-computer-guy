'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { PricingTable } from './pricing-table'
import { SubscriptionPlan, DatabaseService } from '@/lib/database'
import { AuthService, AuthUser } from '@/lib/auth'
import { SquareService } from '@/lib/square'
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  CreditCard, 
  User, 
  MapPin, 
  Phone,
  Mail,
  Shield,
  CheckCircle
} from 'lucide-react'

interface SubscriptionWizardProps {
  initialPlan?: SubscriptionPlan
  onComplete?: (subscriptionId: string) => void
  onCancel?: () => void
}

interface WizardData {
  selectedPlan: SubscriptionPlan | null
  customerInfo: {
    fullName: string
    email: string
    phone: string
    address: {
      line1: string
      line2: string
      city: string
      state: string
      zipCode: string
    }
    company?: string
  }
  billingInfo: {
    cardToken: string
    billingAddress: {
      line1: string
      line2: string
      city: string
      state: string
      zipCode: string
    }
  }
}

const STEPS = [
  { id: 'plan', title: 'Choose Plan', icon: Shield },
  { id: 'account', title: 'Account Info', icon: User },
  { id: 'billing', title: 'Billing', icon: CreditCard },
  { id: 'confirmation', title: 'Confirmation', icon: CheckCircle }
]

export function SubscriptionWizard({ 
  initialPlan, 
  onComplete, 
  onCancel 
}: SubscriptionWizardProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [user, setUser] = useState<AuthUser | null>(null)
  const [wizardData, setWizardData] = useState<WizardData>({
    selectedPlan: initialPlan || null,
    customerInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: {
        line1: '',
        line2: '',
        city: '',
        state: 'VA',
        zipCode: ''
      }
    },
    billingInfo: {
      cardToken: '',
      billingAddress: {
        line1: '',
        line2: '',
        city: '',
        state: 'VA',
        zipCode: ''
      }
    }
  })

  // Load plans and user data on mount
  useEffect(() => {
    async function loadInitialData() {
      try {
        // Load subscription plans
        const subscriptionPlans = await DatabaseService.getSubscriptionPlans()
        setPlans(subscriptionPlans)

        // Check if user is logged in
        const currentUser = await AuthService.getCurrentUser()
        if (currentUser) {
          setUser(currentUser)
          setWizardData(prev => ({
            ...prev,
            customerInfo: {
              ...prev.customerInfo,
              fullName: currentUser.user_metadata?.full_name || '',
              email: currentUser.email || ''
            }
          }))
        }
      } catch (err) {
        console.error('Error loading initial data:', err)
      }
    }

    loadInitialData()
  }, [])

  const updateWizardData = (section: keyof WizardData, data: any) => {
    setWizardData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }))
  }

  const validateCurrentStep = (): boolean => {
    switch (STEPS[currentStep].id) {
      case 'plan':
        return !!wizardData.selectedPlan

      case 'account':
        const { fullName, email, phone, address } = wizardData.customerInfo
        return !!(fullName && email && phone && address.line1 && address.city && address.zipCode)

      case 'billing':
        return !!wizardData.billingInfo.cardToken

      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1)
      setError('')
    } else {
      setError('Please complete all required fields')
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
      setError('')
    }
  }

  const handleSubmit = async () => {
    if (!wizardData.selectedPlan) {
      setError('Please select a plan')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Step 1: Create or get customer account
      let currentUser = user
      if (!currentUser) {
        // Create account if user is not logged in
        const authData = await AuthService.signUp(
          wizardData.customerInfo.email, 
          'temp-password', // User will need to set password via email
          {
            full_name: wizardData.customerInfo.fullName,
            role: 'customer'
          }
        )
        currentUser = authData.user as AuthUser
      }

      if (!currentUser) {
        throw new Error('Failed to create user account')
      }

      // Step 2: Create customer record in database
      let customer = await DatabaseService.getCustomerByUserId(currentUser.id)
      
      if (!customer) {
        customer = await DatabaseService.createCustomer({
          user_id: currentUser.id,
          email: wizardData.customerInfo.email,
          full_name: wizardData.customerInfo.fullName,
          phone: wizardData.customerInfo.phone,
          address: JSON.stringify(wizardData.customerInfo.address)
        })
      }

      // Step 3: Create Square customer
      const squareCustomer = await SquareService.createCustomer({
        email: wizardData.customerInfo.email,
        givenName: wizardData.customerInfo.fullName.split(' ')[0],
        familyName: wizardData.customerInfo.fullName.split(' ').slice(1).join(' '),
        phoneNumber: wizardData.customerInfo.phone,
        address: {
          addressLine1: wizardData.customerInfo.address.line1,
          addressLine2: wizardData.customerInfo.address.line2,
          locality: wizardData.customerInfo.address.city,
          administrativeDistrictLevel1: wizardData.customerInfo.address.state,
          postalCode: wizardData.customerInfo.address.zipCode,
          country: 'US'
        }
      })

      if (!squareCustomer?.id) {
        throw new Error('Failed to create Square customer')
      }

      // Step 4: Create subscription
      const subscription = await DatabaseService.createSubscription({
        customer_id: customer.id,
        plan_id: wizardData.selectedPlan.id,
        status: 'pending',
        cancel_at_period_end: false
      })

      // Step 5: Log subscription event
      await DatabaseService.createEvent({
        subscription_id: subscription.id,
        event_type: 'subscription_created',
        event_data: {
          plan_name: wizardData.selectedPlan.name,
          customer_email: wizardData.customerInfo.email
        }
      })

      // Step 6: Move to confirmation step
      setCurrentStep(STEPS.length - 1)
      
      if (onComplete) {
        onComplete(subscription.id)
      }

    } catch (err: any) {
      console.error('Subscription creation error:', err)
      setError(err.message || 'Failed to create subscription. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (STEPS[currentStep].id) {
      case 'plan':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Choose Your Protection Plan</h2>
              <p className="text-muted-foreground">
                Select the plan that best fits your needs
              </p>
            </div>
            
            <PricingTable
              plans={plans}
              onSelectPlan={(plan) => updateWizardData('selectedPlan', plan)}
              selectedPlanId={wizardData.selectedPlan?.id}
              showComparison={false}
            />
          </div>
        )

      case 'account':
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Account Information</h2>
              <p className="text-muted-foreground">
                Tell us about yourself and where you're located
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={wizardData.customerInfo.fullName}
                    onChange={(e) => updateWizardData('customerInfo', { fullName: e.target.value })}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={wizardData.customerInfo.email}
                    onChange={(e) => updateWizardData('customerInfo', { email: e.target.value })}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={wizardData.customerInfo.phone}
                    onChange={(e) => updateWizardData('customerInfo', { phone: e.target.value })}
                    placeholder="(757) 555-0123"
                    required
                  />
                </div>

                {wizardData.selectedPlan?.plan_type === 'business' && (
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={wizardData.customerInfo.company || ''}
                      onChange={(e) => updateWizardData('customerInfo', { company: e.target.value })}
                      placeholder="Your company name"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Service Address *
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="address1">Address Line 1 *</Label>
                  <Input
                    id="address1"
                    value={wizardData.customerInfo.address.line1}
                    onChange={(e) => updateWizardData('customerInfo', { 
                      address: { ...wizardData.customerInfo.address, line1: e.target.value }
                    })}
                    placeholder="Street address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address2">Address Line 2</Label>
                  <Input
                    id="address2"
                    value={wizardData.customerInfo.address.line2}
                    onChange={(e) => updateWizardData('customerInfo', { 
                      address: { ...wizardData.customerInfo.address, line2: e.target.value }
                    })}
                    placeholder="Apt, suite, etc."
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={wizardData.customerInfo.address.city}
                      onChange={(e) => updateWizardData('customerInfo', { 
                        address: { ...wizardData.customerInfo.address, city: e.target.value }
                      })}
                      placeholder="Virginia Beach"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      value={wizardData.customerInfo.address.zipCode}
                      onChange={(e) => updateWizardData('customerInfo', { 
                        address: { ...wizardData.customerInfo.address, zipCode: e.target.value }
                      })}
                      placeholder="23462"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'billing':
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Payment Information</h2>
              <p className="text-muted-foreground">
                Secure payment processing powered by Square
              </p>
            </div>

            {/* Square Payment Form will be integrated here in the next step */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
                <CardDescription>
                  Your payment information is secured with bank-level encryption
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Square payment form will be integrated here
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'confirmation':
        return (
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome to VA Computer Guy!</h2>
              <p className="text-muted-foreground">
                Your {wizardData.selectedPlan?.name} subscription has been created successfully.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Subscription Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                <div className="flex justify-between">
                  <span>Plan:</span>
                  <span className="font-medium">{wizardData.selectedPlan?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Price:</span>
                  <span className="font-medium">
                    ${wizardData.selectedPlan?.price_monthly.toFixed(2)}/month
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Next Billing:</span>
                  <span className="font-medium">
                    {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Button 
                size="lg" 
                onClick={() => router.push('/dashboard')}
                className="w-full"
              >
                Go to Dashboard
              </Button>
              
              <p className="text-sm text-muted-foreground">
                You'll receive a confirmation email shortly with your account details.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const progress = ((currentStep + 1) / STEPS.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-4">Protection Plan Signup</Badge>
          <h1 className="text-4xl font-bold mb-2">Get Protected Today</h1>
          <p className="text-muted-foreground">
            Join hundreds of satisfied customers who trust VA Computer Guy
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <Progress value={progress} className="h-2 mb-4" />
          
          <div className="flex justify-between">
            {STEPS.map((step, index) => {
              const Icon = step.icon
              const isCompleted = index < currentStep
              const isCurrent = index === currentStep
              
              return (
                <div 
                  key={step.id}
                  className={`flex flex-col items-center ${
                    isCompleted || isCurrent ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    isCompleted 
                      ? 'bg-primary text-primary-foreground' 
                      : isCurrent
                        ? 'bg-primary/20 text-primary border-2 border-primary'
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {isCompleted ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">{step.title}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6">
            <div className="p-4 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
              {error}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={currentStep === 0 ? onCancel : prevStep}
            disabled={loading}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            {currentStep === 0 ? 'Cancel' : 'Previous'}
          </Button>

          {currentStep < STEPS.length - 1 ? (
            <Button
              onClick={currentStep === STEPS.length - 2 ? handleSubmit : nextStep}
              disabled={!validateCurrentStep() || loading}
            >
              {loading ? 'Processing...' : currentStep === STEPS.length - 2 ? 'Create Subscription' : 'Next'}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={() => router.push('/dashboard')}>
              Continue to Dashboard
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}