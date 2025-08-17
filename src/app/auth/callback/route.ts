import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Redirect to dashboard on successful verification
      return NextResponse.redirect(`${origin}/dashboard`)
    }
  }

  // Redirect to login with error if something went wrong
  return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_error`)
}