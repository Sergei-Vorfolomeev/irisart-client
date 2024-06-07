export enum Roles {
  user = 'user',
  admin = 'admin',
}

export interface User {
  id: string
  userName: string
  email: string
  role: Roles
  banStatus: boolean
  createdAt: Date | null
}
