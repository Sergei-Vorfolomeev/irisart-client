import { createStore } from 'zustand/vanilla'
import { devtools, persist } from 'zustand/middleware'
import { Roles, User } from '@/types/user.type'
import { Code, InterLayerObject } from '@/utils/inter-layer-object'
import { authApi } from '@/api/auth.api'

export type UserState = {
  isSignedIn: boolean
  user: User
}

export type UserActions = {
  signIn: (email: string, password: string) => Promise<InterLayerObject>
  setSignedIn: (value: boolean) => InterLayerObject
  signOut: () => Promise<InterLayerObject>
  setUser: (user: User) => void
  me: () => Promise<InterLayerObject>
  confirmEmail: (code: string) => Promise<InterLayerObject>
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
    createdAt: new Date(),
  },
}

export const createUserStore = (initState: UserState = defaultInitState) => {
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
              const res = await authApi.signIn(email, password)
              if (res.status === 200) {
                set(() => ({ isSignedIn: true }))
                return new InterLayerObject(Code.ok)
              }
              return new InterLayerObject(Code.error, 'status code is not 200')
            } catch (e) {
              console.error(e)
              return new InterLayerObject(Code.error, e)
            }
          },
          signOut: async (): Promise<InterLayerObject> => {
            try {
              const res = await authApi.signOut()
              if (res.status === 204) {
                set(() => initState)
                return new InterLayerObject(Code.ok)
              }
              return new InterLayerObject(Code.error, 'status code is not 204')
            } catch (e) {
              console.error(e)
              return new InterLayerObject(Code.error, e)
            }
          },
          me: async (): Promise<InterLayerObject> => {
            try {
              const res = await authApi.me()
              if (res.status === 200) {
                set(() => ({ user: res.data }))
                return new InterLayerObject(Code.ok)
              }
              return new InterLayerObject(Code.error, 'status code is not 200')
            } catch (e) {
              console.error(e)
              return new InterLayerObject(Code.error, e)
            }
          },
          confirmEmail: async (code: string): Promise<InterLayerObject> => {
            try {
              const res = await authApi.confirmEmail(code)
              if (res.status === 204) {
                set(() => ({ isSignedIn: true }))
                return new InterLayerObject(Code.ok)
              }
              return new InterLayerObject(Code.error, 'status code is not 204')
            } catch (e) {
              console.error(e)
              return new InterLayerObject(Code.error, e)
            }
          },
          setSignedIn: (value: boolean): InterLayerObject => {
            set(() => ({ isSignedIn: true }))
            return new InterLayerObject(Code.ok)
          },
        }),
        { name: 'userStorage' },
      ),
    ),
  )
}

// import { create, StateCreator } from 'zustand'
// import { createStore } from 'zustand/vanilla'
// import { Roles, User } from '@/types/user.type'
// import { authApi } from '@/api/auth.api'
// import { Code, InterLayerObject } from '@/utils/inter-layer-object'
// import { persist, PersistOptions } from 'zustand/middleware'
//
// type UserState = {
//   isSignedIn: boolean
//   user: User
// }
//
// type UserActions = {
//   // signIn: (email: string, password: string) => Promise<InterLayerObject>
//   // setSignedIn: (value: boolean) => InterLayerObject
//   // signOut: () => Promise<InterLayerObject>
//   setUser: (user: User) => void
//   // me: () => Promise<InterLayerObject>
//   // confirmEmail: (code: string) => Promise<InterLayerObject>
// }
//
// export type UserStore = UserState & UserActions
//
// const initialState: UserState = {
//   isSignedIn: false,
//   user: {
//     id: '',
//     userName: '',
//     email: '',
//     role: Roles.user,
//     banStatus: false,
//     createdAt: new Date(),
//   },
// }

// export const createUserStore = (initState: UserState = initialState) => {
//   return create<UserStore>((set) => ({
//     ...initialState,
//     setUser: () => set((state) => ({ user: state.user })),
//     signIn: async (
//       email: string,
//       password: string,
//     ): Promise<InterLayerObject> => {
//       try {
//         const res = await authApi.signIn(email, password)
//         if (res.status === 200) {
//           set(() => ({ isSignedIn: true }))
//           return new InterLayerObject(Code.ok)
//         }
//         return new InterLayerObject(Code.error, 'status code is not 200')
//       } catch (e) {
//         console.error(e)
//         return new InterLayerObject(Code.error, e)
//       }
//     },
//     signOut: async (): Promise<InterLayerObject> => {
//       try {
//         const res = await authApi.signOut()
//         if (res.status === 204) {
//           set(() => initialState)
//           return new InterLayerObject(Code.ok)
//         }
//         return new InterLayerObject(Code.error, 'status code is not 204')
//       } catch (e) {
//         console.error(e)
//         return new InterLayerObject(Code.error, e)
//       }
//     },
//     me: async (): Promise<InterLayerObject> => {
//       try {
//         const res = await authApi.me()
//         if (res.status === 200) {
//           set(() => ({ user: res.data }))
//           return new InterLayerObject(Code.ok)
//         }
//         return new InterLayerObject(Code.error, 'status code is not 200')
//       } catch (e) {
//         console.error(e)
//         return new InterLayerObject(Code.error, e)
//       }
//     },
//     confirmEmail: async (code: string): Promise<InterLayerObject> => {
//       try {
//         const res = await authApi.confirmEmail(code)
//         if (res.status === 204) {
//           set(() => ({ isSignedIn: true }))
//           return new InterLayerObject(Code.ok)
//         }
//         return new InterLayerObject(Code.error, 'status code is not 204')
//       } catch (e) {
//         console.error(e)
//         return new InterLayerObject(Code.error, e)
//       }
//     },
//     setSignedIn: (value: boolean): InterLayerObject => {
//       set(() => ({ isSignedIn: true }))
//       return new InterLayerObject(Code.ok)
//     },
//   }))
// }

// export const createUserStore = createStore<UserStore>()(
//   // persist(
//   (set, get) => ({
//     ...initialState,
//     setUser: () => set((state) => ({ user: state.user })),
//     signIn: async (
//       email: string,
//       password: string,
//     ): Promise<InterLayerObject> => {
//       try {
//         const res = await authApi.signIn(email, password)
//         if (res.status === 200) {
//           set(() => ({ isSignedIn: true }))
//           return new InterLayerObject(Code.ok)
//         }
//         return new InterLayerObject(Code.error, 'status code is not 200')
//       } catch (e) {
//         console.error(e)
//         return new InterLayerObject(Code.error, e)
//       }
//     },
//     signOut: async (): Promise<InterLayerObject> => {
//       try {
//         const res = await authApi.signOut()
//         if (res.status === 204) {
//           set(() => initialState)
//           return new InterLayerObject(Code.ok)
//         }
//         return new InterLayerObject(Code.error, 'status code is not 204')
//       } catch (e) {
//         console.error(e)
//         return new InterLayerObject(Code.error, e)
//       }
//     },
//     me: async (): Promise<InterLayerObject> => {
//       try {
//         const res = await authApi.me()
//         if (res.status === 200) {
//           set(() => ({ user: res.data }))
//           return new InterLayerObject(Code.ok)
//         }
//         return new InterLayerObject(Code.error, 'status code is not 200')
//       } catch (e) {
//         console.error(e)
//         return new InterLayerObject(Code.error, e)
//       }
//     },
//     confirmEmail: async (code: string): Promise<InterLayerObject> => {
//       try {
//         const res = await authApi.confirmEmail(code)
//         if (res.status === 204) {
//           set(() => ({ isSignedIn: true }))
//           return new InterLayerObject(Code.ok)
//         }
//         return new InterLayerObject(Code.error, 'status code is not 204')
//       } catch (e) {
//         console.error(e)
//         return new InterLayerObject(Code.error, e)
//       }
//     },
//     setSignedIn: (value: boolean): InterLayerObject => {
//       set(() => ({ isSignedIn: true }))
//       return new InterLayerObject(Code.ok)
//     },
//   }),
// {
//   name: 'user-storage', // имя ключа в локальном хранилище
// },
// ),
// )

// export const userStore = create<UserStore>((set) => ({
//   ...initialState,
//   setUser: () => set((state) => ({ user: state.user })),
//   signIn: async (
//     email: string,
//     password: string,
//   ): Promise<InterLayerObject> => {
//     try {
//       const res = await authApi.signIn(email, password)
//       if (res.status === 200) {
//         set(() => ({ isSignedIn: true }))
//         return new InterLayerObject(Code.ok)
//       }
//       return new InterLayerObject(Code.error, 'status code is not 200')
//     } catch (e) {
//       console.error(e)
//       return new InterLayerObject(Code.error, e)
//     }
//   },
//   signOut: async (): Promise<InterLayerObject> => {
//     try {
//       const res = await authApi.signOut()
//       if (res.status === 204) {
//         set(() => initialState)
//         return new InterLayerObject(Code.ok)
//       }
//       return new InterLayerObject(Code.error, 'status code is not 204')
//     } catch (e) {
//       console.error(e)
//       return new InterLayerObject(Code.error, e)
//     }
//   },
//   me: async (): Promise<InterLayerObject> => {
//     try {
//       const res = await authApi.me()
//       if (res.status === 200) {
//         set(() => ({ user: res.data }))
//         return new InterLayerObject(Code.ok)
//       }
//       return new InterLayerObject(Code.error, 'status code is not 200')
//     } catch (e) {
//       console.error(e)
//       return new InterLayerObject(Code.error, e)
//     }
//   },
//   confirmEmail: async (code: string): Promise<InterLayerObject> => {
//     try {
//       const res = await authApi.confirmEmail(code)
//       if (res.status === 204) {
//         return new InterLayerObject(Code.ok)
//       }
//       return new InterLayerObject(Code.error, 'status code is not 204')
//     } catch (e) {
//       console.error(e)
//       return new InterLayerObject(Code.error, e)
//     }
//   },
//   signInAfterEmailConfirmation: (): InterLayerObject => {
//     set(() => ({ isSignedIn: true }))
//     return new InterLayerObject(Code.ok)
//   },
// }))
