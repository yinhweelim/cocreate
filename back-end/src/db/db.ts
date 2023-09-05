import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DB_USER,
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

export { pool };
