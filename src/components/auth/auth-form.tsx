'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthService, AUTH_ERRORS } from '@/lib/auth'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface AuthFormProps {
  mode: 'login' | 'signup'
  onSuccess?: () => void
  redirectTo?: string
}

export function AuthForm({ mode, onSuccess, redirectTo = '/dashboard' }: AuthFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isSignup = mode === 'signup'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validation
      if (!formData.email || !formData.password) {
        throw new Error('Email and password are required')
      }

      if (isSignup) {
        if (!formData.fullName) {
          throw new Error('Full name is required')
        }
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match')
        }
        if (formData.password.length < 6) {
          throw new Error(AUTH_ERRORS.WEAK_PASSWORD)
        }
      }

      if (isSignup) {
        await AuthService.signUp(formData.email, formData.password, {
          full_name: formData.fullName,
          role: 'customer'
        })
        
        // Show success message for email verification
        setError('')
        alert('Account created! Please check your email to verify your account.')
      } else {
        await AuthService.signIn(formData.email, formData.password)
        
        // Redirect on successful login
        if (onSuccess) {
          onSuccess()
        } else {
          router.push(redirectTo)
        }
      }
    } catch (err: unknown) {
      console.error('Auth error:', err)
      
      // Map Supabase errors to user-friendly messages
      let errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      
      if (err instanceof Error && err.message?.includes('Invalid login credentials')) {
        errorMessage = AUTH_ERRORS.INVALID_CREDENTIALS
      } else if (err instanceof Error && err.message?.includes('User already registered')) {
        errorMessage = AUTH_ERRORS.EMAIL_ALREADY_EXISTS
      } else if (err instanceof Error && err.message?.includes('Password should be at least')) {
        errorMessage = AUTH_ERRORS.WEAK_PASSWORD
      } else if (err instanceof Error && err.message?.includes('Unable to validate email address')) {
        errorMessage = AUTH_ERRORS.INVALID_EMAIL
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) setError('') // Clear error when user starts typing
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </CardTitle>
        <CardDescription>
          {isSignup 
            ? 'Sign up for your protection plan account'
            : 'Sign in to manage your protection plan'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="pl-10"
                  required={isSignup}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={isSignup ? 'Create a password (min. 6 characters)' : 'Enter your password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {isSignup && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="pl-10"
                  required={isSignup}
                />
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              'Processing...'
            ) : (
              <>
                {isSignup ? 'Create Account' : 'Sign In'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            {isSignup ? (
              <>
                Already have an account?{' '}
                <Link href="/auth/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </>
            ) : (
              <>
                Don&apos;t have an account?{' '}
                <Link href="/auth/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </>
            )}
          </div>

          {!isSignup && (
            <div className="text-center">
              <Link 
                href="/auth/forgot-password" 
                className="text-sm text-primary hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

// Wrapper components for specific use cases
export function LoginForm(props: Omit<AuthFormProps, 'mode'>) {
  return <AuthForm mode="login" {...props} />
}

export function SignupForm(props: Omit<AuthFormProps, 'mode'>) {
  return <AuthForm mode="signup" {...props} />
}