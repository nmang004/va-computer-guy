'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, X, Shield, Star, Zap, Heart } from 'lucide-react'
import { SubscriptionPlan } from '@/lib/database'

interface PricingTableProps {
  plans: SubscriptionPlan[]
  onSelectPlan: (plan: SubscriptionPlan) => void
  selectedPlanId?: string
  showComparison?: boolean
}

export function PricingTable({ 
  plans, 
  onSelectPlan, 
  selectedPlanId,
  showComparison = true 
}: PricingTableProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')

  // Default plans if none provided
  const defaultPlans: SubscriptionPlan[] = [
    {
      id: 'residential',
      name: 'Residential Protection',
      description: 'Perfect for families and home users',
      plan_type: 'residential',
      price_monthly: 19.99,
      features: [
        'Unlimited remote support',
        'Priority phone support',
        'Monthly system optimization',
        'Virus/malware protection',
        '20% discount on repairs',
        'Free pickup/delivery'
      ],
      is_active: true,
      created_at: '',
      updated_at: ''
    },
    {
      id: 'business',
      name: 'Business Protection',
      description: 'Comprehensive IT protection for businesses',
      plan_type: 'business',
      price_monthly: 99.99,
      features: [
        'Everything in Residential',
        'On-site support (2 visits/month)',
        'Network monitoring',
        'Data backup management',
        '24/7 emergency support',
        'Hardware replacement priority'
      ],
      is_active: true,
      created_at: '',
      updated_at: ''
    }
  ]

  const displayPlans = plans.length > 0 ? plans : defaultPlans

  const getAnnualPrice = (monthlyPrice: number) => {
    return monthlyPrice * 12 * 0.9 // 10% discount for annual billing
  }

  const getPlanIcon = (planType: string) => {
    switch (planType) {
      case 'residential':
        return Heart
      case 'business':
        return Zap
      default:
        return Shield
    }
  }

  const isPlanPopular = (planType: string) => {
    return planType === 'residential'
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Billing Period Toggle */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center bg-muted rounded-lg p-1">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingPeriod === 'monthly'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod('annual')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingPeriod === 'annual'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Annual
            <Badge variant="secondary" className="ml-2 text-xs">
              Save 10%
            </Badge>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className={`grid gap-8 ${displayPlans.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
        {displayPlans.map((plan) => {
          const Icon = getPlanIcon(plan.plan_type)
          const isPopular = isPlanPopular(plan.plan_type)
          const isSelected = selectedPlanId === plan.id
          const currentPrice = billingPeriod === 'annual' 
            ? getAnnualPrice(plan.price_monthly) 
            : plan.price_monthly

          return (
            <Card 
              key={plan.id} 
              className={`relative transition-all duration-200 hover:shadow-lg ${
                isSelected 
                  ? 'ring-2 ring-primary shadow-lg' 
                  : isPopular 
                    ? 'border-primary shadow-md' 
                    : ''
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                
                <div className="mt-6">
                  <div className="text-4xl font-bold">
                    {formatPrice(currentPrice)}
                    <span className="text-lg text-muted-foreground font-normal">
                      /{billingPeriod === 'annual' ? 'year' : 'month'}
                    </span>
                  </div>
                  {billingPeriod === 'annual' && (
                    <div className="text-sm text-muted-foreground mt-1">
                      {formatPrice(plan.price_monthly)}/month billed annually
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features List */}
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full" 
                  variant={isSelected ? "default" : isPopular ? "default" : "outline"}
                  onClick={() => onSelectPlan(plan)}
                  size="lg"
                >
                  {isSelected ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Selected
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Choose Plan
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Feature Comparison Table (if enabled) */}
      {showComparison && displayPlans.length > 1 && (
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-center mb-8">Compare Plans</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-background rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Features</th>
                  {displayPlans.map((plan) => (
                    <th key={plan.id} className="text-center p-4 font-medium">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Extract all unique features */}
                {Array.from(new Set(displayPlans.flatMap(plan => plan.features))).map((feature, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-4 text-sm">{feature}</td>
                    {displayPlans.map((plan) => (
                      <td key={plan.id} className="p-4 text-center">
                        {plan.features.includes(feature) ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Trust Indicators */}
      <div className="mt-12 text-center">
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>30-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>No setup fees</span>
          </div>
          <div className="flex items-center gap-2">
            <X className="h-4 w-4" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </div>
  )
}