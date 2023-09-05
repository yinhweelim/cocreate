const Pool = require("pg").Pool;
import { Request, Response } from "express";
import { QueryResult } from "pg"; // Import the QueryResult type

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

pool.connect((error: Error) => {
  if (error) {
    console.error("Database connection error:", error);
  } else {
    console.log("Connected to the database");
  }
});

const getTestData = (req: Request, res: Response) => {
  console.log("here");
  pool.query("SELECT * FROM testdata", (error: Error, results: QueryResult) => {
    if (error) {
      throw error;
    }
    console.log(results);
    res.status(200).json(results.rows);
  });
};

export default { getTestData };
