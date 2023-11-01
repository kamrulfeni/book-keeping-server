import config from '../../../config'
import ApiError from '../../../shared/ApiError'
import { IResponsePayload } from '../../../shared/globalInterfaces'
import UserModel from './users.Model'
import { IUser } from './users.interface'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'

const signUpService = async (payload: IUser): Promise<IResponsePayload<IUser>> => {
  console.log(payload)
  const isExist = await UserModel.findOne({ email: payload.email })
  if (isExist) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'User already exists')
  }

  const data = await UserModel.create(payload)
  data.password = undefined

  return {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data,
  }
}
const loginService = async (payload: IUser) => {
  // existence of user
  const isExist = await UserModel.isExist(payload.email)
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  const { _id, password, email, name } = isExist

  // if no password
  if (!password) throw new ApiError(httpStatus.FORBIDDEN, 'Server error occurred')
  if (!payload.password) throw new ApiError(httpStatus.FORBIDDEN, 'Password is required')

  // verify
  const isVerified = await UserModel.isPasswordMatched(payload.password, password)
  if (!isVerified) throw new ApiError(httpStatus.FORBIDDEN, 'Password dose not matched')

  const accessToken = jwt.sign({ _id, email, name }, config.token.access_token_secret, {
    expiresIn: config.token.access_token_time,
  })
  const refreshToken = jwt.sign({ _id, email, name }, config.token.refresh_token_secret, {
    expiresIn: config.token.refresh_token_time,
  })

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: { accessToken, refreshToken },
  }
}


const usersService = {
  signUpService,
  loginService,
}

export default usersService
