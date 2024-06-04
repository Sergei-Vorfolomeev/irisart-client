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
import { Code } from '@/utils/inter-layer-object'
import { useUserStore } from '@/store/user-store-provider'

const FormSchema = z.object({
  code: z.string().min(4, {
    message: 'Your code must be 4 characters.',
  }),
})

type FormData = z.infer<typeof FormSchema>

export default function ConfirmEmail() {
  const { confirmEmail } = useUserStore((state) => state)
  const [timer, setTimer] = useState(7)
  const [loading, setLoading] = useState(false)
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
    try {
      setLoading(true)
      const { code } = await confirmEmail(data.code)
      if (code === Code.ok) {
        router.replace('dashboard')
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
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
  }, [timer])

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
                <InputOTP
                  maxLength={4}
                  {...field}
                  autoFocus
                  ref={inputOtpRef}
                  disabled={loading}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="text-2xl" />
                    <InputOTPSlot index={1} className="text-2xl" />
                    <InputOTPSlot index={2} className="text-2xl" />
                    <InputOTPSlot index={3} className="text-2xl" />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription> {loading && 'Проверяем код'} </FormDescription>
              <FormDescription>
                {timer !== 0 ? (
                  `Повторно запросить код можно через ${timer} секунд`
                ) : (
                  <Button onClick={handleResend}>Отправить код повторно</Button>
                )}
              </FormDescription>
              {/*<FormMessage/>*/}
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
