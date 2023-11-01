import { SortOrder } from 'mongoose'

export type IErrorMessages = {
  path: string | number
  message: string
}

export type IErrorPayload = {
  success: boolean
  message: string
  errorMessages: IErrorMessages[]
  stack?: unknown
  statusCode?: number
}

export type IResponsePayload<T> = {
  statusCode: number
  success: boolean
  data: T | null
  message?: string
  meta?: {
    page: number
    limit: number
    total: number
  }
}

export type ISortCondition = { [key: string]: SortOrder }

export type IPagination = {
  page: number
  limit: number
  skip: number
  sortCondition: ISortCondition
}

export type IFilter = { [key: string]: object }

export type IPartialSearchableFields = string[]

export interface CustomJwtPayload {
  _id?: string
  name?: string
  email?: string
  iat?: string
  exp?: string
}
