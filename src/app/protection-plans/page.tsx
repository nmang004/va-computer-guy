'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PricingTable } from '@/components/protection-plans/pricing-table'
import { SubscriptionWizard } from '@/components/protection-plans/subscription-wizard'
import { SubscriptionPlan } from '@/lib/database'
import { AuthService, AuthUser } from '@/lib/auth'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { ArrowLeft, Phone, CheckCircle, Shield, Star, Users, Zap } from "lucide-react"

export default function ProtectionPlansPage() {
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null)
  const [showWizard, setShowWizard] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        // Check if user is logged in
        const currentUser = await AuthService.getCurrentUser()
        setUser(currentUser)

        // Load subscription plans
        const response = await fetch('/api/subscription-plans')
        if (response.ok) {
          const data = await response.json()
          setPlans(data.plans)
        }
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handlePlanSelect = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan)
    setShowWizard(true)
  }

  const handleWizardComplete = () => {
    // Redirect to dashboard after successful subscription
    router.push('/dashboard')
  }

  const handleWizardCancel = () => {
    setShowWizard(false)
    setSelectedPlan(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading protection plans...</p>
        </div>
      </div>
    )
  }

  if (showWizard) {
    return (
      <SubscriptionWizard
        initialPlan={selectedPlan || undefined}
        onComplete={handleWizardComplete}
        onCancel={handleWizardCancel}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Protection Plans</Badge>
            <h1 className="text-4xl font-bold mb-4">Stay Protected Year-Round</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Proactive monitoring, regular maintenance, and priority support to keep your technology running smoothly. 
              Join hundreds of satisfied customers who trust VA Computer Guy for reliable IT protection.
            </p>
          </div>

          {/* User Status Notice */}
          {user && (
            <div className="mb-8">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">
                        Welcome back, {user.user_metadata?.full_name || user.email}!
                      </p>
                      <p className="text-sm text-green-600">
                        You can subscribe to a protection plan instantly. No need to create an account.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Interactive Pricing Table */}
          <div className="mb-16">
            <PricingTable
              plans={plans}
              onSelectPlan={handlePlanSelect}
              selectedPlanId={selectedPlan?.id}
              showComparison={true}
            />
          </div>

          {/* Social Proof & Benefits */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-4">Why Choose Protection Plans?</h2>
              <p className="text-muted-foreground">
                Join over 500+ satisfied customers who trust VA Computer Guy
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Prevent Problems</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Proactive monitoring catches issues before they become major problems, saving you time and money.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Peace of Mind</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Sleep better knowing your technology is being monitored and maintained by professionals.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Priority Support</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Get faster response times and priority scheduling when you need help most.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Statistics */}
          <div className="mb-12">
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">500+</div>
                    <div className="text-sm text-muted-foreground">Protected Devices</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                    <div className="text-sm text-muted-foreground">Uptime Guarantee</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">Monitoring</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">15+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Testimonials */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-center mb-8">What Our Customers Say</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm mb-2">
                        &ldquo;The protection plan has saved us from multiple potential disasters. 
                        The team caught a virus before it could spread through our network.&rdquo;
                      </p>
                      <p className="text-xs text-muted-foreground">- Sarah M., Small Business Owner</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm mb-2">
                        &ldquo;Best investment we&apos;ve made for our family&apos;s computers. 
                        No more slow computers or surprise issues!&rdquo;
                      </p>
                      <p className="text-xs text-muted-foreground">- Mike R., Residential Customer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-8 pb-8">
                <h2 className="text-2xl font-semibold mb-4">Ready to Get Protected?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Choose your protection plan above to get started instantly, or contact us 
                  to discuss your specific needs with our expert team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="tel:(757)375-6764">
                      <Phone className="mr-2 h-4 w-4" />
                      Call (757) 375-6764
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/booking">Schedule Consultation</Link>
                  </Button>
                  {!user && (
                    <Button size="lg" variant="secondary" asChild>
                      <Link href="/auth/login">
                        Sign In to Subscribe
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}