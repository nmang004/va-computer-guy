import { createClient as createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { User } from '@supabase/supabase-js'

export interface AuthUser extends User {
  user_metadata?: {
    full_name?: string
    role?: string
    [key: string]: unknown
  }
}

// Server-side auth functions (must be used in Server Components only)
export class ServerAuthService {
  
  // Get current user (server-side)
  static async getCurrentUser(): Promise<AuthUser | null> {
    const supabase = await createServerClient()
    
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) return null
    
    return user as AuthUser | null
  }

  // Get session (server-side)
  static async getSession() {
    const supabase = await createServerClient()
    
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) return null
    
    return session
  }

  // Require authentication (middleware helper)
  static async requireAuth(): Promise<AuthUser> {
    const user = await this.getCurrentUser()
    
    if (!user) {
      redirect('/auth/login')
    }
    
    return user
  }

  // Check if user has specific role (for admin features)
  static async hasRole(role: string): Promise<boolean> {
    const user = await this.getCurrentUser()
    if (!user) return false
    
    return user.user_metadata?.role === role
  }

  // Require admin access
  static async requireAdmin(): Promise<AuthUser> {
    const user = await this.requireAuth()
    
    if (!await this.hasRole('admin')) {
      redirect('/unauthorized')
    }
    
    return user
  }
}