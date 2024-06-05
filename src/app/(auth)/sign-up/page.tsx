'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Spinner } from '@/components/icons/spinner'
import { useState } from 'react'
import { useUserStore } from '@/store/user-store-provider'
import { Code } from '@/utils/inter-layer-object'

type FormData = {
  userName: string
  email: string
  password: string
}

export default function SignUp() {
  const [isSpinning, setIsSpinning] = useState(false)
  const { signUp } = useUserStore((state) => state)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const router = useRouter()

  const onSubmit: SubmitHandler<FormData> = async ({
    userName,
    email,
    password,
  }) => {
    try {
      setIsSpinning(true)
      const { code } = await signUp(userName, email, password)
      if (code === Code.ok) {
        router.replace('/confirm-email')
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsSpinning(false)
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="user-name">User name</Label>
                <Input
                  id="user-name"
                  placeholder="Max"
                  required
                  {...register('userName', {
                    required: 'User name is required',
                  })}
                />
                {errors.userName && (
                  <p className="text-red-500">{errors.userName.message}</p>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSpinning}>
              {isSpinning ? <Spinner /> : 'Create an account'}
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with Google
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/sign-in" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
