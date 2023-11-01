import { Model } from 'mongoose'

export type IUser = {
  name: string
  email: string
  password?: string
}

export interface IUserPic extends IUser {
  _id: string,
}

export interface IUserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  isExist(email: string): Promise<Pick<IUserPic, '_id' | 'email' | 'password' | 'name'> | null>
  // eslint-disable-next-line no-unused-vars
  isPasswordMatched(currentPass: string, password: string): Promise<boolean>
}
