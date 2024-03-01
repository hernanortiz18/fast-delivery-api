export interface UserAttributes {
  id?: Number
  email: string
  password: string
  name: string
  lastName: string
  status: string
  role: string
  salt?: string
}

export type TokenAttributes = Omit<UserAttributes, 'password', 'salt'>
