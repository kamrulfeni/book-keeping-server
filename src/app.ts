import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import httpStatus from "http-status";
import router from "./app/module/routes";
import globalError from "./app/middleware/globalError";
import { IErrorPayload } from "./shared/globalInterfaces";
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// router
app.use("/api/v1", router);

app.get("/", async (req: Request, res: Response) => {
  res.status(httpStatus.OK).send("Welcome to Book shop");
});



// app.post('/upload', upload.single("file"), (req, res) => {
//   BookModel.create({image: req.file?.filename})
//   .then ((result: any) => res.json(result))
//   .catch((err: any) => console.log(err))

//  console.log(req.file);
//  res.send("success")
// })
// app.get('/getImage', ( req, res) =>{
//   UserModel.find()
//   .then(users => res.json(users))
//   .catch(err => res.json(err))
// })

app.use(globalError);

// handle not found route

app.use((req: Request, res: Response) => {
  const errorPayload: IErrorPayload = {
    success: false,
    message: "Route not found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "Route not found",
      },
    ],
  };
  return res.status(404).send(errorPayload);
});

export default app;
