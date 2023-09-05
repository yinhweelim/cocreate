import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import { pool } from "../db/db";

const uuidv4 = v4;
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

const updatePassword = async (req: Request, res: Response) => {
  try {
    //get auth object based on email
    const authResult = await pool.query("SELECT * FROM auth WHERE email = $1", [
      req.body.email,
    ]);

    if (authResult.rows.length === 0) {
      return res.status(404).json({ status: "error", msg: "User not found" });
    }

    //check current password
    const authData = authResult.rows[0];
    const passwordMatch = await bcrypt.compare(
      req.body.current_password,
      authData.hash
    );

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ status: "error", msg: "Incorrect current password" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(req.body.new_password, 12);

    // Update the password in the database
    const updateQuery = "UPDATE auth SET hash = $1 WHERE email = $2";
    await pool.query(updateQuery, [hashedNewPassword, req.body.email]);

    res.json({ status: "ok", msg: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while updating password",
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    //get auth object based on email
    const auth = await pool.query("SELECT * FROM auth WHERE email = $1", [
      req.body.email,
    ]);
    if (auth.rows.length === 0) {
      return res.status(404).json({ status: "error", msg: "Not authorised" });
    }

    //check current password
    const authData = auth.rows[0];

    const result = await bcrypt.compare(req.body.password, authData.hash); //compare method will hash provided password and compare with hashed password
    if (!result) {
      console.log("username or password error");
      return res.status(401).json({ status: "error", msg: "login failed" });
    }

    const claims = {
      email: authData.email,
      id: authData.id,
    };

    //after user has been successfully authenticated, create jwt
    const access = jwt.sign(claims, process.env.ACCESS_SECRET as string, {
      expiresIn: "30d", //TODO: set to valid for 20 mins
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET as string, {
      expiresIn: "30d", //valid for 30 days
      jwtid: uuidv4(),
    });

    res.json({ access, refresh });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ status: "error", msg: "An error occurred during login" });
  }
};

export { createAuth, updatePassword, login };
