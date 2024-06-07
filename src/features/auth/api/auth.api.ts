import axios from 'axios'
import { User } from '@/interfaces/user.interface'

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/auth',
  withCredentials: true,
})

export const authApi = {
  async signIn(email: string, password: string) {
    return instance.post<void>('/sign-in', { email, password })
  },
  async signUp(userName: string, email: string, password: string) {
    return instance.post<void>('/sign-up', { userName, email, password })
  },
  async signOut() {
    return instance.post<void>('/sign-out')
  },
  async me() {
    return instance.get<User>('/me')
  },
  async resendCode(email: string) {
    return instance.post<void>('/resend-code', { email })
  },
  async confirmEmail(code: string) {
    return instance.post<void>('/confirm-email', { code })
  },
  async updateTokens() {
    return instance.post<void>('/update-tokens')
  },
  async recoverPassword(email: string) {
    return instance.post<void>('/recover-password', { email })
  },
  async setNewPassword(recoveryCode: string, newPassword: string) {
    return instance.post<void>('/set-new-password', {
      recoveryCode,
      newPassword,
    })
  },
}
