'use client'

import { NavMenu } from '@/components/organisms/nav-menu'
import { BsFiletypeSvg } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Code } from '@/utils/inter-layer-object'
import { useUserStore } from '@/store/user.store.provider'
import { ArticlesStoreProvider } from '@/features/articles/store/articles.store.provider'

export function Header() {
  const { isSignedIn, signOut } = useUserStore((state) => state)
  const router = useRouter()

  const handleSignIn = () => {
    router.push('/sign-in')
  }

  const handleSignOut = async () => {
    const { code } = await signOut()
    if (code === Code.ok) {
      router.replace('/sign-in')
    }
  }

  return (
    <div className="flex items-center justify-between w-full h-16 p-6 bg-emerald-300">
      <BsFiletypeSvg className="w-12 h-12" />
      <ArticlesStoreProvider>
        <NavMenu />
      </ArticlesStoreProvider>
      {isSignedIn ? (
        <Button variant="outline" onClick={handleSignOut}>
          Выйти
        </Button>
      ) : (
        <Button variant="outline" onClick={handleSignIn}>
          Войти
        </Button>
      )}
    </div>
  )
}
