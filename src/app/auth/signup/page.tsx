import { SignupForm } from '@/components/auth/auth-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        
        <div className="flex-1 flex items-center justify-center">
          <SignupForm />
        </div>
      </div>
    </div>
  )
}