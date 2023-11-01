import { RequestHandler } from 'express'
import { IResponsePayload } from '../../../shared/globalInterfaces'
import usersService from './users.service'
import { IUser } from './users.interface'
import config from '../../../config'

const signUpController: RequestHandler = async (req, res, next) => {
  try {
    const data = await usersService.signUpService(req.body)
    const payload: IResponsePayload<IUser> = {
      statusCode: data.statusCode,
      success: data.success,
      message: data.message,
      data: data.data,
    }
    // send response
    return res.status(payload.statusCode).send(payload)
  } catch (error) {
    return next(error)
  }
}
const loginController: RequestHandler = async (req, res, next) => {
  try {
    const data = await usersService.loginService(req.body)
    const { accessToken, refreshToken } = data.data

    const cookieOptions = {
      secure: config.node_env === 'production',
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60 * 1000,
    }

    res.cookie('refreshToken', refreshToken, cookieOptions)

    const payload: IResponsePayload<{ accessToken: string }> = {
      statusCode: data.statusCode,
      success: data.success,
      message: data.message,
      data: { accessToken },
    }
    // send response
    return res.status(payload.statusCode).send(payload)
  } catch (error) {
    return next(error)
  }
}
const getMyDataController: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user

    const payload: IResponsePayload<object> = {
      statusCode: 200,
      success: true,
      message: 'User data get successful',
      data: user,
    }
    // send response
    return res.status(payload.statusCode).send(payload)
  } catch (error) {
    return next(error)
  }
}



const usersController = {
  signUpController,
  loginController,
  getMyDataController
}

export default usersController
