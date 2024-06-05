import { create } from 'zustand'

export type RequestStatusType = 'idle' | 'pending' | 'success' | 'error'

type AppState = {
  isInitialized: boolean
  status: RequestStatusType
  error: null | string
}

type AppActions = {
  setAppStatus: (status: RequestStatusType) => void
  setError: (error: null | string) => void
  initializeApp: (value: boolean) => void
}

export type AppStore = AppState & AppActions

export const useAppStore = create<AppStore>((set) => ({
  status: 'idle',
  error: null,
  isInitialized: false,
  setAppStatus: (status) => set({ status }),
  setError: (error) => set({ error }),
  initializeApp: (value) => set({ isInitialized: value }),
}))
