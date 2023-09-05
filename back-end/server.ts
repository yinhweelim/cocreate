import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import db from "./src/db/db";

const app: Express = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.json({
    info: "Node.js, Express, and Postgres API",
  });
});

app.get("/testdata", db.getTestData);

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
