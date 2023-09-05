import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../db/db";

const createAuth = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //check if email already exists
    const checkEmailQuery = "SELECT * FROM auth WHERE email = $1";
    const emailCheckResult = await pool.query(checkEmailQuery, [email]);

    if (emailCheckResult.rows.length > 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "email already exists" });
    }
    //hash password
    const hash = await bcrypt.hash(password, 12);

    //insert new auth resource into database
    const insertAuthQuery = "INSERT INTO auth (email,hash) VALUES ($1, $2)";
    await pool.query(insertAuthQuery, [email, hash]);

    //get id of new auth resource
    const createdAuth = await pool.query(
      "SELECT id FROM auth WHERE email = $1",
      [email]
    );

    const createdAuthId = createdAuth.rows[0].id;

    res.json({ status: "ok", msg: "auth created", id: createdAuthId });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while registering the user",
    });
  }
};

export { createAuth };
