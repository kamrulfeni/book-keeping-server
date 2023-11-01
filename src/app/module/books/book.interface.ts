import { Types } from 'mongoose'
import { Model } from 'mongoose'

export type IBook = {
  title: string;
  authorDetails: Types.ObjectId;
  author: string;
  image: string;
  genre:
    | "mystery"
    | "romance"
    | "scienceFiction"
    | "fantasy"
    | "thriller"
    | "historicalFiction"
    | "biography"
    | "selfHelp"
    | "horror"
    | "poetry";
  publicationDate: Date;
  reviews: IReview[];
  isFinished?: boolean;
};

export type IReview = {
  user: string
  comment: string
}

export type IBookModel = Model<IBook, Record<string, unknown>>

export type IYear = {
  year: string
}

export type IYearModel = Model<IYear, Record<string, unknown>>
