import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { errorLog, successLog } from "./shared/logger";
import { Server } from "http";

let server: Server;

process.on("uncaughtException", (error) => {
  console.log("uncaughtException: " + error.message);
  process.exit(1);
});

const bootFunction = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("🛢 Database connection established...");
    server = app.listen(config.port, () => {
      successLog("Server is listening on port: " + config.port);
      //console.log(config.database_url);
    });
  } catch (error) {
    errorLog(error as string);
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.log("unhandledRejection");
        console.log(error);
        process.exit(1);
      });
    }
  });
};

bootFunction();

process.on("SIGALRM", () => {
  console.log("SIGTERM is received");
  if (server) {
    server.close();
  }
});

// {
//     "version": 2,
//     "builds": [
//       {
//         "src": "dist/server.js",
//         "use": "@vercel/node"
//       }
//     ],
//     "routes": [
//       {
//         "src": "/(.*)",
//         "dest": "dist/server.js"
//       }
//     ]
//   }
