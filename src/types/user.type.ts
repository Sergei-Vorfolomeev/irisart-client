export enum Roles {
  user = 'user',
  admin = 'admin',
}

export type User = {
  id: string
  userName: string
  email: string
  role: Roles
  banStatus: boolean
  createdAt: Date
}
