'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface AdminGuardProps {
  children: React.ReactNode
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      if (!supabase) {
        // If Supabase not configured, allow access (for development)
        setIsAuthenticated(true)
        return
      }

      try {
        // Check if user has active session
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session) {
          setIsAuthenticated(true)
          localStorage.setItem('admin_authenticated', 'true')
        } else {
          // Check localStorage as fallback
          const localAuth = localStorage.getItem('admin_authenticated')
          if (localAuth === 'true') {
            setIsAuthenticated(true)
          } else {
            setIsAuthenticated(false)
            router.push('/admin/login')
          }
        }
      } catch (error) {
        console.error('Auth check error:', error)
        setIsAuthenticated(false)
        router.push('/admin/login')
      }
    }

    checkAuth()

    // Listen for auth state changes
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          setIsAuthenticated(true)
          localStorage.setItem('admin_authenticated', 'true')
        } else {
          setIsAuthenticated(false)
          localStorage.removeItem('admin_authenticated')
          router.push('/admin/login')
        }
      })

      return () => subscription.unsubscribe()
    }
  }, [router])

  // Show loading state while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Show children if authenticated
  if (isAuthenticated) {
    return <>{children}</>
  }

  // Redirecting (will be handled by router.push)
  return null
}
