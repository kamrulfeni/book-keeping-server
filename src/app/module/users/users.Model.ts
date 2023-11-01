import { Schema, model } from 'mongoose'
import { IUser, IUserModel } from './users.interface'
import ApiError from '../../../shared/ApiError'
import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import config from '../../../config'

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

// statics
userSchema.statics.isExist = async function (email: string) {
  return await UserModel.findOne({ email }, { email: 1, password: 1, name: 1 })
}
userSchema.statics.isPasswordMatched = async function (currentPass: string, savedPassword: string) {
  return await bcrypt.compare(currentPass, savedPassword)
}

userSchema.pre('save', async function (next) {
  if (!this?.password) {
    throw new ApiError(httpStatus.FORBIDDEN, 'forbidden')
  }
  this.password = await bcrypt.hash(this.password, Number(config.salt_round))
  next()
})

const UserModel = model<IUser, IUserModel>('User', userSchema)

export default UserModel
