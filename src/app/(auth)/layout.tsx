import { ReactNode } from 'react'
import { ThemeToggle } from '@/lib/theme-toggle'

type PropsType = {
  children: ReactNode
}

export default function AuthLayout({ children }: PropsType) {
  return (
    <section className="flex relative items-center justify-center h-lvh">
      <div className="absolute top-0 right-0">
        <ThemeToggle />
      </div>
      {children}
    </section>
  )
}
