'use client'

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { z } from 'zod'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import * as React from 'react'

const FormSchema = z.object({
  code: z.string().min(4, {
    message: 'Your code must be 4 characters.',
  }),
})

type FormData = z.infer<typeof FormSchema>

export default function ConfirmEmail() {
  const [time, setTimer] = useState(7)
  const router = useRouter()

  const inputOtpRef = useRef<HTMLInputElement>(null)

  const userEmail = localStorage.getItem('userEmail')

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: '',
    },
  })

  const code = useWatch({
    name: 'code',
    defaultValue: '',
    control: form.control,
  })

  const onSubmit = async (data: FormData) => {
    const res = await fetch('http://localhost:8080/api/auth/confirm-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })

    if (res.ok) {
      router.replace('dashboard')
    }
  }

  const handleResend = async () => {
    form.reset()
    inputOtpRef.current?.focus()
    setTimer(7)
    await fetch('http://localhost:8080/api/auth/resend-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: userEmail,
      }),
    })
  }

  useEffect(() => {
    if (code.length === 4) {
      form.handleSubmit(onSubmit)()
    }
  }, [code, form])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [time])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 flex flex-col items-center"
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Введите код из письма</FormLabel>
              <FormControl>
                <InputOTP maxLength={4} {...field} autoFocus ref={inputOtpRef}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                {time !== 0 &&
                  `Повторно запросить код можно через ${time} секунд`}
              </FormDescription>
              {time === 0 && (
                <Button onClick={handleResend}>Отправить код повторно</Button>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
