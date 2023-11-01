import express from "express";
import usersRoute from "./users/users.routes";
import bookRoute from "./books/book.routes";

const router = express.Router();

router.use("/users", usersRoute);
router.use("/books", bookRoute);

export default router;
