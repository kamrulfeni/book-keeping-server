//import ApiError from '../../../shared/ApiError'
import { IFilter, IPagination, IResponsePayload } from '../../../shared/globalInterfaces'

import httpStatus from 'http-status'
import { IBook } from './book.interface'
import BookModel from './book.Model'
import YearModel from './year.model'

const createBookService = async (payload: IBook): Promise<IResponsePayload<IBook>> => {
  const year = new Date(payload.publicationDate).getFullYear().toString()

  const isYearExist = await YearModel.find({ year: year.toString() })
 // console.log(isYearExist, isYearExist.length, year)
  if (isYearExist.length === 0) {
    await YearModel.create({ year })
  }
  const data = await BookModel.create(payload);
   console.log(data, "this service file  i jjjjjjjjjjjjj")
  return {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Book created successfully',
    data,
  }
}

const getAllBooksService = async (filter: IFilter, pagination: IPagination): Promise<IResponsePayload<IBook[]>> => {
  const { limit, page, skip, sortCondition } = pagination

  const data = await BookModel.find(filter)
    .limit(limit)
    .skip(skip)
    .sort(sortCondition)
    .populate('authorDetails', { email: 1, name: 1 })
  const total = await BookModel.countDocuments(filter)

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully',
    data,
    meta: {
      page,
      limit,
      total,
    },
  }
}

const getBookService = async (id: string): Promise<IResponsePayload<IBook>> => {
  const data = await BookModel.findById(id).populate({ path: 'authorDetails', select: { name: 1, email: 1 } })

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully',
    data,
  }
}

const updateBookService = async (id: string, body: Partial<IBook>): Promise<IResponsePayload<IBook>> => {
  const data = await BookModel.findByIdAndUpdate(id, body, { new: true })

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data,
  }
}

const removeBookService = async (id: string): Promise<IResponsePayload<IBook>> => {
  const data = await BookModel.findByIdAndDelete(id)

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
    data,
  }
}

const getYearService = async (pagination: IPagination) => {
  const { limit, page, skip, sortCondition } = pagination
  const years: string[] = []
  const data = await YearModel.find().limit(limit).skip(skip).sort(sortCondition).select({ year: 1, _id: 0 })
  const total = await YearModel.countDocuments()
  data.map((y) => years.push(y.year))
  const sorted = years.sort()
  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Year retrieved successfully',
    data: sorted,
    meta: {
      page,
      limit,
      total,
    },
  }
}

const bookService = {
  createBookService,
  getAllBooksService,
  getBookService,
  updateBookService,
  removeBookService,
  getYearService,
}

export default bookService
