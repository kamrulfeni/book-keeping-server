import mongoose from 'mongoose'
import { IErrorMessages, IErrorPayload } from '../../shared/globalInterfaces'
import httpStatus from 'http-status'

const validationErrorHandler = (error: mongoose.Error.ValidationError): IErrorPayload => {
  const errorMessages: IErrorMessages[] = Object.values(error.errors).map((item) => ({
    path: item?.path,
    message: item?.message,
  }))

  return {
    success: false,
    statusCode: httpStatus.BAD_REQUEST,
    message: error.name,
    errorMessages,
  }
}

export default validationErrorHandler
