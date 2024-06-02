'use client'

import { SignOutButton } from '@/components/moleculs/sign-out.button'
import { NavMenu } from '@/components/organisms/nav-menu'
import { BsFiletypeSvg } from 'react-icons/bs'

export function Header() {
  return (
    <div className="flex items-center justify-between w-full h-16 p-6 bg-destructive">
      <BsFiletypeSvg className="w-12 h-12" />
      <NavMenu />
      <SignOutButton />
    </div>
  )
}
