import express from 'express'
import globalValidator from '../../middleware/globalValidation'
import bookController from './book.controllers'
import { createBookValidatorZod, updateBookValidatorZod } from './book.validator'
import { tokenVerify } from '../../middleware/auth'

const bookRoute = express.Router()

bookRoute.post('/', globalValidator(createBookValidatorZod), tokenVerify, bookController.createBookController)
bookRoute.get('/', bookController.getAllBooksController)
bookRoute.get('/year', bookController.getAllYear)

// params
bookRoute.get('/:bookId', bookController.getSingleBookController)
bookRoute.patch('/:bookId', tokenVerify, globalValidator(updateBookValidatorZod), bookController.updateBookController)
bookRoute.delete('/:bookId', tokenVerify, bookController.removeBookController)

export default bookRoute
