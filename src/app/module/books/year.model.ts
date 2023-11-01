import { Schema, model } from 'mongoose'
import { IYear, IYearModel } from './book.interface'

const yearSchema = new Schema<IYear>(
  {
    year: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

const YearModel = model<IYear, IYearModel>('Year', yearSchema)

export default YearModel
