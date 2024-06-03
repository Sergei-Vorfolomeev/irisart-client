'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

type PropsType = {}

export const SignOutButton = () => {
  const router = useRouter()

  const handleSignOut = async () => {
    const res = await fetch('http://localhost:8080/api/auth/sign-out', {
      method: 'POST',
      credentials: 'include',
    })
    if (res.ok) {
      router.replace('/sign-in')
    }
  }

  return (
    <Button variant="outline" onClick={handleSignOut}>
      Sign out
    </Button>
  )
}
