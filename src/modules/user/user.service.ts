import { TOrder, TUser } from './user.interface'
import { User } from './user.model'

const createUserToDB = async (userData: TUser) => {
  const user = new User(userData)
  const result = await user.save()
  return result
}

const getAllUsersFromDB = async () => {
  const result = await User.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  )
  return result
}

const getSingleUserFromDB = async (id: number) => {
  if (!(await User.userExists(id))) {
    const error = new Error('User not found')
    error.code = 500
    throw error
  }
  const result = await User.findOne({ userId: id })
  return result
}

const updateUserToDB = async (id: number, userData: TUser) => {
  // Checking if the user exists in DB or not
  if (!(await User.userExists(id))) {
    const error = new Error('User not found')
    error.code = 500
    throw error
  }

  const result = await User.findOneAndUpdate({ userId: id }, userData)
  return result
}

const deleteUserToDB = async (id: number) => {
  if (!(await User.userExists(id))) {
    const error = new Error('User not found')
    error.code = 500
    throw error
  }
  const result = await User.deleteOne({ userId: id })
  return result
}

const createOrderToDB = async (orderData: TOrder, id: number) => {
  const user = await User.find({ userId: id })

  if (user) {
    if (!user.order) {
      user.order = []
    }

    user.order.push(orderData)
    await user.save()
  }
  return user;
}

export const userServices = {
  createUserToDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserToDB,
  deleteUserToDB,
  createOrderToDB,
}
