import { redirect } from 'next/navigation'
import { ServerAuthService } from '@/lib/auth-server'
import { DatabaseService } from '@/lib/database'
import { DashboardContent } from '@/components/dashboard/dashboard-content'

export default async function DashboardPage() {
  // Require authentication
  const user = await ServerAuthService.getCurrentUser()
  if (!user) {
    redirect('/auth/login?redirectTo=/dashboard')
  }

  // Get customer data
  let customer = null
  let subscriptions = []
  let activeSubscription = null

  try {
    customer = await DatabaseService.getCustomerByUserId(user.id)
    
    if (customer) {
      subscriptions = await DatabaseService.getCustomerSubscriptions(customer.id)
      activeSubscription = await DatabaseService.getActiveSubscription(customer.id)
    }
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  }

  return (
    <DashboardContent 
      user={user}
      customer={customer}
      subscriptions={subscriptions}
      activeSubscription={activeSubscription}
    />
  )
}