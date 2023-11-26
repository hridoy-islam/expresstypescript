import { Schema, model } from 'mongoose'
import { TAddress, TOrder, TUser, TUserName, UserModel } from './user.interface'
import config from '../../config'
import bcrypt from 'bcrypt'

const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
})

const userAddressSchema = new Schema<TAddress>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
})

const orderSchema = new Schema<TOrder>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
})

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, unique: true, select: false },
  fullName: {
    type: userNameSchema,
    required: true,
  },
  age: { type: Number },
  email: { type: String, required: true, unique: true },
  isActive: Boolean,
  hobbies: [String],
  address: userAddressSchema,
  order: [orderSchema],
})

userSchema.pre('save', async function (next) {
  const user = this
  user.password = await bcrypt.hash(user.password, Number(config.saltRounds))
  next()
})

userSchema.statics.userExists = async function (
  userId: number,
): Promise<boolean> {
  const user = await this.findOne({ userId })
  return !!user // Returns true if user exists, false otherwise
}

export const User = model<TUser, UserModel>('User', userSchema)
