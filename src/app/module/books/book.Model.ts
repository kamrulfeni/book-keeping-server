import { Schema, model } from 'mongoose'
import { IBook, IBookModel } from './book.interface'
import { bookEnum } from './bookConstant'

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      require: true,
      enum: bookEnum,
    },
    image: {
      type: String,
      require: true,
    },
    publicationDate: {
      type: Date,
      required: true,
    },

    reviews: [
      {
        user: String,
        comment: String,
      },
    ],
    author: {
      type: String,
    },
    isFinished: {
      type: Boolean,
    },
    authorDetails: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const BookModel = model<IBook, IBookModel>('Book', bookSchema)

export default BookModel
