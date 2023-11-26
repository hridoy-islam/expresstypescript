import { Request, Response } from 'express'
import UserValidationSchema from './user.validation'
import { userServices } from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body
    const zodParseData = UserValidationSchema.parse(user)
    const userData = await userServices.createUserToDB(zodParseData)

    const result = userData.toObject()
    delete result.password

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: 'something wrong',
      error: error,
    })
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB()
    if (!result) throw new Error('No users found')
    res.status(200).json({
      success: true,
      message: 'User Retrived successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: true,
      message: 'something wrong',
      error: error,
    })
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId
    const result = await userServices.getSingleUserFromDB(Number(id))

    res.status(200).json({
      success: true,
      message: 'User Retrived successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: error.code,
        description: error.message,
      },
    })
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const user = req.body
    const id = req.params.userId
    const zodParseData = UserValidationSchema.parse(user)
    const result = await userServices.updateUserToDB(Number(id), zodParseData)

    res.status(200).json({
      success: true,
      message: 'User Updated successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: error.code,
        description: error.message,
      },
    })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId
    const result = await userServices.deleteUserToDB(Number(id))

    res.status(200).json({
      success: true,
      message: 'User Deleted successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: error.code,
        description: error.message,
      },
    })
  }
}

// order

const createOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId
    const orderData = req.body
    const result = await userServices.createOrderToDB(orderData, Number(id))

    res.status(200).json({
      success: true,
      message: 'Order Created successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: error.code,
        description: error.message,
      },
    })
  }
}

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  createOrder,
}
