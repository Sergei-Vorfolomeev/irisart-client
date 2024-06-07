import { createStore } from 'zustand/vanilla'
import { devtools, persist } from 'zustand/middleware'
import { Roles, User } from '@/interfaces/user.interface'
import { Code, InterLayerObject } from '@/utils/inter-layer-object'
import { authApi } from '@/features/auth/api/auth.api'
import { handleServerError } from '@/utils/handle-server-error'
import { useAppStore } from '@/store/app.store'
import axios from 'axios'

export type UserState = {
  isSignedIn: boolean
  user: User
}

export type UserActions = {
  signIn: (email: string, password: string) => Promise<InterLayerObject>
  signUp: (
    userName: string,
    email: string,
    password: string,
  ) => Promise<InterLayerObject>
  setSignedIn: (value: boolean) => InterLayerObject
  signOut: () => Promise<InterLayerObject>
  setUser: (user: User) => void
  me: () => Promise<InterLayerObject>
  confirmEmail: (code: string) => Promise<InterLayerObject>
  resendCode: (email: string | null) => Promise<InterLayerObject>
}

export type UserStore = UserState & UserActions

export const defaultInitState: UserState = {
  isSignedIn: false,
  user: {
    id: '',
    userName: '',
    email: '',
    role: Roles.user,
    banStatus: false,
    createdAt: null,
  },
}

export const createUserStore = (initState: UserState = defaultInitState) => {
  const setError = useAppStore.getState().setError
  return createStore<UserStore>()(
    devtools(
      persist(
        (set) => ({
          ...initState,
          setUser: () => set((state) => ({ user: state.user })),
          signIn: async (
            email: string,
            password: string,
          ): Promise<InterLayerObject> => {
            try {
              await authApi.signIn(email, password)
              set({ isSignedIn: true })
              return new InterLayerObject(Code.ok)
            } catch (e) {
              return handleServerError(setError, e)
            }
          },
          signUp: async (userName: string, email: string, password: string) => {
            try {
              await authApi.signUp(userName, email, password)
              set((state) => ({
                user: {
                  ...state.user,
                  email: email,
                  userName: userName,
                },
              }))
              return new InterLayerObject(Code.ok)
            } catch (e) {
              return handleServerError(setError, e)
            }
          },
          signOut: async (): Promise<InterLayerObject> => {
            try {
              await authApi.signOut()
              set(() => initState)
              return new InterLayerObject(Code.ok)
            } catch (e) {
              return handleServerError(setError, e)
            }
          },
          me: async (): Promise<InterLayerObject> => {
            try {
              const res = await authApi.me()
              set(() => ({ user: res.data }))
              return new InterLayerObject(Code.ok)
            } catch (e) {
              if (axios.isAxiosError(e) && e.response?.status === 401) {
                set(() => initState)
                return new InterLayerObject(Code.error)
              }
              return handleServerError(setError, e)
            }
          },
          confirmEmail: async (code: string): Promise<InterLayerObject> => {
            try {
              await authApi.confirmEmail(code)
              set(() => ({ isSignedIn: true }))
              return new InterLayerObject(Code.ok)
            } catch (e) {
              return handleServerError(setError, e)
            }
          },
          setSignedIn: (value: boolean): InterLayerObject => {
            set(() => ({ isSignedIn: value }))
            return new InterLayerObject(Code.ok)
          },
          resendCode: async (
            email: string | null,
          ): Promise<InterLayerObject> => {
            try {
              if (!email) {
                return new InterLayerObject(Code.error, 'email is null')
              }
              await authApi.resendCode(email)
              return new InterLayerObject(Code.ok)
            } catch (e) {
              return handleServerError(setError, e)
            }
          },
        }),
        { name: 'userStorage' },
      ),
    ),
  )
}
