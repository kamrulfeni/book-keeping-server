import { RequestHandler } from "express";
import { IResponsePayload } from "../../../shared/globalInterfaces";
import bookService from "./book.service";
import { IBook } from "./book.interface";
import UserModel from "../users/users.Model";
import ApiError from "../../../shared/ApiError";
import httpStatus from "http-status";
import BookModel from "./book.Model";
import { paginationHelper } from "../../../helper/paginationHelper";
import filterHelper from "../../../helper/filterHelper";
// import * as path from "path";
// import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/Images");
//   },
//   filename: (req, file, cb) => {
//     const fileExt = path.extname(file.originalname);
//     const filenameField =
//       file.originalname
//         .replace(fileExt, "")
//         .toLowerCase()
//         .split(" ")
//         .join("_") +
//       "_" +
//       Date.now();

//     cb(null, `${filenameField}${fileExt}`);
//   },
// });

// // Define the upload middleware using the storage configuration
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1000000,
//   },
//   fileFilter: (req, file, cb) => {
//     if (file.fieldname === "image") {
//       if (
//         file.mimetype === "image/png" ||
//         file.mimetype === "image/jpg" ||
//         file.mimetype === "image/jpeg"
//       ) {
//         cb(null, true);
//       } else {
//         cb(new Error("only .jpg, .png, or .jpeg format allowed"));
//       }
//     }
//   },
// });

const createBookController: RequestHandler = async (req, res, next) => {
  // upload.single("image")(req, res, async (uploadError: any) => {
  //   if (uploadError) {
  //     return next(uploadError);
  //   }

  try {
    const isUserExist = UserModel.isExist(req.user.email);
    if (!isUserExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
    }
    const newBook = {
      ...req.body,

      author: req.user.name,
      authorDetails: req.user._id,
    };
    console.log(req.body);
    const data = await bookService.createBookService(newBook);
    const payload: IResponsePayload<IBook> = {
      statusCode: data.statusCode,
      success: data.success,
      message: data.message,
      data: data.data,
    };
    // send response
    return res.status(payload.statusCode).send(payload);
  } catch (error) {
    return next(error);
  }
};

const getAllBooksController: RequestHandler = async (req, res, next) => {
  try {
    const pagination = paginationHelper(req.query);
    const filter = filterHelper(
      req,
      new BookModel(),
      ["title", "genre", "image", "author"],
      ["publicationDate"]
    );
    const data = await bookService.getAllBooksService(filter, pagination);

    const payload: IResponsePayload<IBook[]> = {
      statusCode: data.statusCode,
      success: data.success,
      message: data.message,
      meta: data.meta,
      data: data.data,
    };
    // send response
    return res.status(payload.statusCode).send(payload);
  } catch (error) {
    return next(error);
  }
};

const getSingleBookController: RequestHandler = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const data = await bookService.getBookService(bookId);

    const payload: IResponsePayload<IBook> = {
      statusCode: data.statusCode,
      success: data.success,
      message: data.message,
      data: data.data,
    };
    // send response
    return res.status(payload.statusCode).send(payload);
  } catch (error) {
    return next(error);
  }
};

const updateBookController: RequestHandler = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const data = await bookService.updateBookService(bookId, req.body);

    const payload: IResponsePayload<IBook> = {
      statusCode: data.statusCode,
      success: data.success,
      message: data.message,
      data: data.data,
    };
    // send response
    return res.status(payload.statusCode).send(payload);
  } catch (error) {
    return next(error);
  }
};

const removeBookController: RequestHandler = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const data = await bookService.removeBookService(bookId);

    const payload: IResponsePayload<IBook> = {
      statusCode: data.statusCode,
      success: data.success,
      message: data.message,
      data: data.data,
    };
    // send response
    return res.status(payload.statusCode).send(payload);
  } catch (error) {
    return next(error);
  }
};

const getAllYear: RequestHandler = async (req, res, next) => {
  try {
    const pagination = paginationHelper(req.query);
    const data = await bookService.getYearService(pagination);

    const payload: IResponsePayload<string[]> = {
      statusCode: data.statusCode,
      success: data.success,
      message: data.message,
      meta: data.meta,
      data: data.data,
    };
    // send response
    return res.status(payload.statusCode).send(payload);
  } catch (error) {
    return next(error);
  }
};

const bookController = {
  createBookController,
  getAllBooksController,
  getSingleBookController,
  updateBookController,
  removeBookController,
  getAllYear,
};

export default bookController;
