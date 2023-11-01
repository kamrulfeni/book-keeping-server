import { RequestHandler } from 'express'
import ApiError from '../../shared/ApiError'
import httpStatus from 'http-status'
//import jwt from 'jsonwebtoken'
import jwt from "jsonwebtoken";

import config from '../../config'
import { CustomJwtPayload } from '../../shared/globalInterfaces'
import UserModel from '../module/users/users.Model'

export const tokenVerify: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token)
      throw new ApiError(httpStatus.UNAUTHORIZED, "you are not authorized");
    const decoded = jwt.verify(token, config.token.access_token_secret) as CustomJwtPayload;

    let isExist = await UserModel.findById(decoded._id);
    if (!isExist) throw new ApiError(httpStatus.BAD_REQUEST, `Invalid user`);
    req.user = decoded;
    next();
  } catch (error) {
    next(error)
  }
}
