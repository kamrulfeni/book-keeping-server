import { ErrorRequestHandler } from 'express'
import { IErrorMessages, IErrorPayload } from '../../shared/globalInterfaces'
import config from '../../config'
import validationErrorHandler from '../errorHandler/validationErrorHandler'
// import { errorLog } from '../../shared/logger'
import zodErrorHandler from '../errorHandler/zodErrorHandler'
// import { ZodError } from 'zod'

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalError: ErrorRequestHandler = (error, req, res, next) => {
  let status: number = error.statusCode || 500
  let message: string = error.message || 'Internal server error occurred'
  let errorMessages: IErrorMessages[] = [
    {
      path: '',
      message: error.message || 'Server error occurred',
    },
  ]
  // console.log(error)

  switch (error?.name) {
    case 'ValidationError': {
      const result = validationErrorHandler(error)
      status = result.statusCode || 500
      message = result.message
      errorMessages = result.errorMessages
      break
    }
    case 'ZodError': {
      const result = zodErrorHandler(error)
      status = result.statusCode || 500
      message = result.message
      errorMessages = result.errorMessages
      break
    }

    default:
      break
  }

  const errorPayload: IErrorPayload = {
    success: false,
    message,
    errorMessages,
    stack: config.node_env !== 'production' && error?.stack,
  }

  console.log(` [${status}]: ${message}`)

  return res.status(status).send(errorPayload)
}

export default globalError
