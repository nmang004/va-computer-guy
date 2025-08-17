'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AuthUser, AuthService } from '@/lib/auth'
import { Customer, Subscription } from '@/lib/database'
import { 
  Shield, 
  CreditCard, 
  Calendar, 
  Settings, 
  LogOut, 
  User, 
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  Pause,
  Play,
  X,
  ArrowRight,
  Download,
  Eye
} from 'lucide-react'
import Link from 'next/link'

interface DashboardContentProps {
  user: AuthUser
  customer: Customer | null
  subscriptions: any[]
  activeSubscription: any
}

export function DashboardContent({ 
  user, 
  customer, 
  subscriptions, 
  activeSubscription 
}: DashboardContentProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    try {
      await AuthService.signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubscriptionAction = async (subscriptionId: string, action: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/subscriptions/${subscriptionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      })

      if (response.ok) {
        // Refresh the page to show updated data
        window.location.reload()
      } else {
        const error = await response.json()
        alert(error.error || 'Action failed')
      }
    } catch (error) {
      console.error('Subscription action error:', error)
      alert('Action failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'canceled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle
      case 'paused': return Pause
      case 'canceled': return X
      default: return AlertCircle
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.user_metadata?.full_name || user.email}
            </p>
          </div>
          
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link href="/">
                Back to Site
              </Link>
            </Button>
            <Button variant="outline" onClick={handleSignOut} disabled={loading}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Protection Status</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {activeSubscription ? 'Protected' : 'Not Protected'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {activeSubscription 
                      ? `${activeSubscription.plan?.name} Plan`
                      : 'No active protection plan'
                    }
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Billing</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {activeSubscription?.current_period_end 
                      ? new Date(activeSubscription.current_period_end).toLocaleDateString()
                      : 'N/A'
                    }
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {activeSubscription 
                      ? `$${activeSubscription.plan?.price_monthly}/month`
                      : 'No billing scheduled'
                    }
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Support Priority</CardTitle>
                  <Phone className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {activeSubscription ? 'Priority' : 'Standard'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {activeSubscription 
                      ? 'Fast-track support'
                      : 'Regular support queue'
                    }
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Current Plan Status */}
            {activeSubscription ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    Your Protection Plan
                  </CardTitle>
                  <CardDescription>
                    You're currently protected under our {activeSubscription.plan?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{activeSubscription.plan?.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${activeSubscription.plan?.price_monthly}/month
                      </p>
                    </div>
                    <Badge className={getStatusColor(activeSubscription.status)}>
                      {activeSubscription.status.charAt(0).toUpperCase() + activeSubscription.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Included Features:</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {activeSubscription.plan?.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/protection-plans">
                        Upgrade Plan
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    No Active Protection Plan
                  </CardTitle>
                  <CardDescription>
                    Get comprehensive protection for your devices today
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      You don't have an active protection plan. Start protecting your devices now!
                    </p>
                    <Button asChild>
                      <Link href="/protection-plans">
                        <Shield className="mr-2 h-4 w-4" />
                        Choose Protection Plan
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Support & Service</CardTitle>
                  <CardDescription>Get help when you need it</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/repair-status">
                      <Eye className="mr-2 h-4 w-4" />
                      Check Repair Status
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/booking">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Service
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="tel:(757)375-6764">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Support
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Management</CardTitle>
                  <CardDescription>Manage your account settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Update Profile
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payment Methods
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Preferences
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Management</CardTitle>
                <CardDescription>
                  Manage your protection plan subscription
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activeSubscription ? (
                  <div className="space-y-6">
                    {/* Current Subscription */}
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{activeSubscription.plan?.name}</h3>
                          <p className="text-muted-foreground">
                            ${activeSubscription.plan?.price_monthly}/month
                          </p>
                        </div>
                        <Badge className={getStatusColor(activeSubscription.status)}>
                          {activeSubscription.status.charAt(0).toUpperCase() + activeSubscription.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium">Current Period</p>
                          <p className="text-sm text-muted-foreground">
                            {activeSubscription.current_period_start 
                              ? new Date(activeSubscription.current_period_start).toLocaleDateString()
                              : 'N/A'
                            } - {activeSubscription.current_period_end 
                              ? new Date(activeSubscription.current_period_end).toLocaleDateString()
                              : 'N/A'
                            }
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Next Billing</p>
                          <p className="text-sm text-muted-foreground">
                            {activeSubscription.current_period_end 
                              ? new Date(activeSubscription.current_period_end).toLocaleDateString()
                              : 'N/A'
                            }
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {activeSubscription.status === 'active' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSubscriptionAction(activeSubscription.id, 'pause')}
                            disabled={loading}
                          >
                            <Pause className="mr-2 h-4 w-4" />
                            Pause Plan
                          </Button>
                        )}
                        
                        {activeSubscription.status === 'paused' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSubscriptionAction(activeSubscription.id, 'resume')}
                            disabled={loading}
                          >
                            <Play className="mr-2 h-4 w-4" />
                            Resume Plan
                          </Button>
                        )}

                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSubscriptionAction(activeSubscription.id, 'cancel')}
                          disabled={loading}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel Plan
                        </Button>

                        <Button variant="outline" size="sm" asChild>
                          <Link href="/protection-plans">
                            Change Plan
                          </Link>
                        </Button>
                      </div>
                    </div>

                    {/* Plan Features */}
                    <div>
                      <h4 className="font-medium mb-3">Plan Features</h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {activeSubscription.plan?.features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-2">No Active Subscription</h3>
                    <p className="text-muted-foreground mb-4">
                      Choose a protection plan to get started
                    </p>
                    <Button asChild>
                      <Link href="/protection-plans">
                        Browse Plans
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>
                  View your payment history and download invoices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No Billing History</h3>
                  <p className="text-muted-foreground">
                    Your billing history will appear here once you have an active subscription
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Manage your account details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
                    <p className="text-sm">
                      {customer?.full_name || user.user_metadata?.full_name || 'Not provided'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    <p className="text-sm">{user.email}</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    <p className="text-sm">{customer?.phone || 'Not provided'}</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Service Address
                    </Label>
                    <p className="text-sm">
                      {customer?.address ? JSON.parse(customer.address).line1 : 'Not provided'}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function Label({ children, className, ...props }: any) {
  return (
    <label className={`text-sm font-medium ${className}`} {...props}>
      {children}
    </label>
  )
}