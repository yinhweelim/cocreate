require("dotenv").config();

import express, { Express, Request, Response } from "express";
import cors from "cors";
const helmet = require("helmet"); //
const rateLimit = require("express-rate-limit");
import bodyParser from "body-parser";

//allows api to be called 100 times within 15min interval
const limit = rateLimit({
  windowMs: 15 * 60 * 1000, //15min
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app: Express = express();
const port = process.env.PORT || 5001;

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
import products from "./src/routers/products";

app.use("/api", auth);
app.use("/api", users);
app.use("/api", creators);
app.use("/api", products);

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
