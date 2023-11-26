import { Model } from 'mongoose'

export type TAddress = {
  street: string
  city: string
  country: string
}

export type TUserName = {
  firstName: string
  lastName: string
}

export type TOrder = {
  productName: string
  price: number
  quantity: number
}

export type TUser = {
  userId: number
  username: string
  password: string
  fullName: TUserName
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: TAddress
  order: TOrder[]
}

export interface UserModel extends Model<TUser> {
  userExists(id: number): Promise<boolean>
}
