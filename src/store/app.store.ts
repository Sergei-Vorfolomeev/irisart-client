import { create } from 'zustand'

type RequestStatusType = 'idle' | 'pending' | 'success' | 'error'

type AppStore = {
  app: {
    isInitialized: boolean
    status: RequestStatusType
    error: null | string
  }
}

type AppActions = {
  setAppStatus: (status: RequestStatusType) => void
  setError: (error: null | string) => void
  initializeApp: (value: boolean) => void
}

export const AppStore = create<AppStore & AppActions>((set) => ({
  app: {
    status: 'idle',
    error: null,
    isInitialized: false,
  },
  setAppStatus: (status) =>
    set((state) => ({ ...state, app: { ...state.app, status } })),
  setError: (error) =>
    set((state) => ({ ...state, app: { ...state.app, error } })),
  initializeApp: (value) =>
    set((state) => ({ ...state, app: { ...state.app, isInitialized: value } })),
}))
