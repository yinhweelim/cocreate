require("dotenv").config();

// import http from "http";
// import { ServerSocket } from "./src/socket/socket";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";

const app: Express = express();
const port = process.env.PORT || 5001;

//allows api to be called 100 times within 15min interval
const limit = rateLimit({
  windowMs: 15 * 60 * 1000, //15min
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

// // Socket Server handling
// const httpServer = http.createServer(app);

// // Listen
// httpServer.listen(1337, () => console.info(`Server is running`));

// // Start the socket
// new ServerSocket(httpServer);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(helmet());
app.use(limit);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routers
import auth from "./src/routers/auth";
import users from "./src/routers/users";
import creators from "./src/routers/creators";
import projects from "./src/routers/projects";
import { ServerSideEncryption } from "@aws-sdk/client-s3";

app.use("/api", auth);
app.use("/api", users);
app.use("/api", creators);
app.use("/api", projects);

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
