'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/lib/theme'
import { UserStoreProvider } from '@/store/user.store.provider'
import { ToastProvider } from '@/components/ui/toast'
import { Toaster } from '@/components/ui/toaster'
import { useEffect } from 'react'
import { useAppStore } from '@/store/app.store'
import { useToast } from '@/components/ui/use-toast'
import { ProductsStoreProvider } from '@/features/products/store/products.store.provider'

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'IRISART',
//   description: 'Art store',
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { error } = useAppStore((state) => state)
  const { toast } = useToast()
  useEffect(() => {
    if (error) {
      toast({
        title: 'Ошибка',
        description: error,
        variant: 'destructive',
        duration: 6000,
      })
    }
  }, [error, toast])
  return (
    <html lang="en">
      <head>
        <title>IrisArt &#9829;</title>
      </head>
      <body className={inter.className}>
        <UserStoreProvider>
          <ProductsStoreProvider>
            <ToastProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
                <Toaster />
              </ThemeProvider>
            </ToastProvider>
          </ProductsStoreProvider>
        </UserStoreProvider>
      </body>
    </html>
  )
}
