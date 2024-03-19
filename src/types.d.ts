import { DateDataType, Identifier, IntegerDataType } from 'sequelize'

export interface UserAttributes {
  id?: Number
  email: string
  password: string
  name: string
  last_name: string
  status: string
  role: string
  salt?: string
  token?: string | null
  last_activity: string
}

export type TokenAttributes = Omit<UserAttributes, 'password', 'salt'>

export interface PackageAttributes {
  id?: Number
  address: string
  client_name: string
  weight: IntegerDataType
  delivery_date: DateDataType
  status: string
  driver_id?: Identifier | null
}

export interface PayloadAttributes {
  id: Number | undefined
  email: string
  name: string
  role: string
  lastName: string
}
