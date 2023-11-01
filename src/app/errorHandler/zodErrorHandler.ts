import { ZodError, ZodIssue } from 'zod'
import { IErrorMessages, IErrorPayload } from '../../shared/globalInterfaces'
import httpStatus from 'http-status'

const zodErrorHandler = (error: ZodError): IErrorPayload => {
  const errorMessages: IErrorMessages[] = error?.issues?.map((issue: ZodIssue) => ({
    path: issue.path[issue.path.length - 1],
    message: issue.message,
  }))

  return {
    success: false,
    message: 'Validation Error',
    errorMessages,
    statusCode: httpStatus.BAD_REQUEST,
  }
}

export default zodErrorHandler
