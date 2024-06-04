'use client'

import { StoreApi, useStore } from 'zustand'
import { createContext, ReactNode, useContext, useRef } from 'react'
import { createUserStore, initUserStore, UserStore } from '@/store/user.store'

export const UserStoreContext = createContext<StoreApi<UserStore> | null>(null)

export type UserStoreProviderProps = {
  children: ReactNode
}

export const UserStoreProvider = ({ children }: UserStoreProviderProps) => {
  const storeRef = useRef<StoreApi<UserStore>>()
  if (!storeRef.current) {
    storeRef.current = createUserStore(initUserStore())
  }

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  )
}

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const userStoreContext = useContext(UserStoreContext)

  if (!userStoreContext) {
    throw new Error(`useUserStore must be use within UserStoreProvider`)
  }

  return useStore(userStoreContext, selector)
}
