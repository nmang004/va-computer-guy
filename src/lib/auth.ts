import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

export interface AuthUser extends User {
  // Additional user properties if needed
}

// Client-side auth functions
export class AuthService {
  
  // Sign up with email and password
  static async signUp(email: string, password: string, metadata?: { [key: string]: any }) {
    const supabase = createClient()
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) throw error
    return data
  }

  // Sign in with email and password
  static async signIn(email: string, password: string) {
    const supabase = createClient()
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    return data
  }

  // Sign out
  static async signOut() {
    const supabase = createClient()
    
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    
    // Redirect to home page after sign out
    window.location.href = '/'
  }

  // Get current user (client-side)
  static async getCurrentUser(): Promise<AuthUser | null> {
    const supabase = createClient()
    
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    
    return user as AuthUser | null
  }

  // Reset password
  static async resetPassword(email: string) {
    const supabase = createClient()
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })

    if (error) throw error
  }

  // Update password
  static async updatePassword(newPassword: string) {
    const supabase = createClient()
    
    const { error } = await supabase.auth.updateUser({ 
      password: newPassword 
    })

    if (error) throw error
  }

  // Update user metadata
  static async updateProfile(updates: { [key: string]: any }) {
    const supabase = createClient()
    
    const { error } = await supabase.auth.updateUser({
      data: updates
    })

    if (error) throw error
  }

  // Listen to auth state changes
  static onAuthStateChange(callback: (user: AuthUser | null) => void) {
    const supabase = createClient()
    
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user as AuthUser | null)
    })
  }
}

// Note: Server-side auth functions are in auth-server.ts

// Auth context types
export interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, metadata?: any) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

// Role-based access control
export const USER_ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
  STAFF: 'staff'
} as const

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]

// Check if user has permission
export function hasPermission(user: AuthUser | null, requiredRole: UserRole): boolean {
  if (!user) return false
  
  const userRole = user.user_metadata?.role as UserRole
  
  // Admin has access to everything
  if (userRole === USER_ROLES.ADMIN) return true
  
  // Staff has access to customer features
  if (userRole === USER_ROLES.STAFF && requiredRole === USER_ROLES.CUSTOMER) return true
  
  // User has access to their own role level
  return userRole === requiredRole
}

// Auth error types
export class AuthError extends Error {
  constructor(message: string, public code?: string) {
    super(message)
    this.name = 'AuthError'
  }
}

// Common auth error messages
export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_NOT_FOUND: 'No account found with this email',
  EMAIL_ALREADY_EXISTS: 'An account with this email already exists',
  WEAK_PASSWORD: 'Password must be at least 6 characters long',
  INVALID_EMAIL: 'Please enter a valid email address',
  NETWORK_ERROR: 'Network error. Please try again.',
  UNAUTHORIZED: 'You are not authorized to access this resource',
  SESSION_EXPIRED: 'Your session has expired. Please sign in again'
}