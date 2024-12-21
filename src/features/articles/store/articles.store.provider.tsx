'use client'

import { createContext, type ReactNode, useContext, useRef } from 'react'
import { type StoreApi, useStore } from 'zustand'
import {
  ArticlesStore,
  createArticlesStore,
} from '@/features/articles/store/articles.store'

export const ArticlesStoreContext =
  createContext<StoreApi<ArticlesStore> | null>(null)

export interface ArticlesStoreProviderProps {
  children: ReactNode
}

export const ArticlesStoreProvider = ({
  children,
}: ArticlesStoreProviderProps) => {
  const storeRef = useRef<StoreApi<ArticlesStore>>()
  if (!storeRef.current) {
    storeRef.current = createArticlesStore()
  }

  return (
    <ArticlesStoreContext.Provider value={storeRef.current}>
      {children}
    </ArticlesStoreContext.Provider>
  )
}

export const useArticlesStore = <T,>(
  selector: (store: ArticlesStore) => T,
): T => {
  const articlesStoreContext = useContext(ArticlesStoreContext)

  if (!articlesStoreContext) {
    throw new Error(`useArticlesStore must be use within ArticlesStoreProvider`)
  }

  return useStore(articlesStoreContext, selector)
}
