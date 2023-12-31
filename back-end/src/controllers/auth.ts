import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { v4 } from "uuid";
import { pool } from "../db/db";

const uuidv4 = v4;

//registration endpoint creates 1 auth object and two user objects linked to the same auth object.
const register = async (req: Request, res: Response) => {
  const client = await pool.connect(); // Get a PostgreSQL client from the pool

  try {
    await client.query("BEGIN"); // Begin the transaction

    const {
      email,
      password,
      given_name: givenName,
      last_name: lastName,
    } = req.body;

    //check if email already exists
    const checkEmailQuery = "SELECT * FROM auth WHERE email = $1";
    const emailCheckResult = await client.query(checkEmailQuery, [email]);

    if (emailCheckResult.rows.length > 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "email already exists" });
    }
    //hash password
    const hash = await bcrypt.hash(password, 12);

    //Step 1: Create new auth resource
    const createAuthQuery =
      "INSERT INTO auth (email,hash) VALUES ($1, $2) RETURNING id";
    const newAuth = await client.query(createAuthQuery, [email, hash]);
    const authId = newAuth.rows[0].id;

    // Step 2: Create a 'creator' object
    const createCreatorQuery =
      "INSERT INTO creators DEFAULT VALUES returning id";
    const newCreator = await client.query(createCreatorQuery);
    const creatorId = newCreator.rows[0].id;

    // Step 3: Create two 'user' objects in the database

    // User with role 'creator'
    const createUserCreatorQuery =
      "INSERT INTO users (role, creator_id, auth_id, given_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING id";
    const newCreatorUser = await client.query(createUserCreatorQuery, [
      "CREATOR",
      creatorId,
      authId,
      givenName,
      lastName,
    ]);
    const creatorUserId = newCreatorUser.rows[0].id;

    // User with role 'patron'
    const createUserPatronQuery =
      "INSERT INTO users (role, auth_id,given_name, last_name) VALUES ($1, $2,$3,$4) RETURNING id";
    const newPatronUser = await client.query(createUserPatronQuery, [
      "PATRON",
      authId,
      givenName,
      lastName,
    ]);
    const patronUserId = newPatronUser.rows[0].id;

    //Step 4: Seed creator template project stages
    // Extract project stages from the request body
    const projectStagesData = [
      {
        name: "Brief",
        description: "Submit your request and preferred consultation slot",
        time_estimate_unit: "DAYS",
        time_estimate_start: 1,
      },
      {
        name: "Consultation",
        description:
          "Consultation over chat or call to explore options and confirm requirements",
        time_estimate_unit: "HOURS",
        time_estimate_start: 1,
      },
      {
        name: "Proposal",
        description:
          "I'll send a proposal comprising the draft design, budget and timeline.",
        time_estimate_unit: "WEEKS",
        time_estimate_start: 1,
        time_estimate_end: 2,
      },
      {
        name: "Proposal acceptance or revision period",
        description:
          "Pay a deposit to confirm the brief or request revisions (up to 2 times)",
        time_estimate_unit: "DAYS",
        time_estimate_start: 2,
      },
      {
        name: "Work starts",
        description:
          "After the deposit is paid, I’ll start work on the piece and share periodic updates",
        time_estimate_unit: "WEEKS",
        time_estimate_start: 2,
        time_estimate_end: 4,
      },
      {
        name: "Completion and delivery",
        description:
          "The completed work will be delivered and the final payment will be processed.",
        time_estimate_unit: "WEEKS",
        time_estimate_start: 2,
        time_estimate_end: 4,
      },
    ];

    for (let i = 0; i < projectStagesData.length; i++) {
      const stage = projectStagesData[i];

      const insertProjectStageQuery = `
       INSERT INTO creator_project_stages (index, name, description, time_estimate_unit, time_estimate_start, time_estimate_end, creator_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *;`;

      const values = [
        i + 1, // Incrementing 1-based index
        stage.name,
        stage.description,
        stage.time_estimate_unit,
        stage.time_estimate_start,
        stage.time_estimate_end,
        creatorId,
      ];

      const result = await client.query(insertProjectStageQuery, values);
    }

    await client.query("COMMIT"); // Commit the transaction

    res.json({
      status: "ok",
      msg: "Registration successful",
      auth_id: authId,
      creator_user_id: creatorUserId,
      patron_user_id: patronUserId,
      creator_id: creatorId,
    });
  } catch (error) {
    await client.query("ROLLBACK"); // Roll back the transaction in case of an error

    console.error("Error registering user:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while registering the user",
    });
  } finally {
    // Release the client back to the pool
    client.release();
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

    //after user has been successfully authenticated, create jwt

    const claims = {
      email: authData.email,
      id: authData.id,
    };

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

const refresh = async (req: Request, res: Response) => {
  try {
    //compare refresh token, returns decoded token (headers and payload)
    const decoded = jwt.verify(
      req.body.refresh,
      process.env.REFRESH_SECRET as string
    ) as JwtPayload;

    //get claims from decoded token, which will be used to create new access token
    const claims = {
      email: decoded.email,
      id: decoded.id,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET as string, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({ access });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(400).json({ status: "error", msg: "Refresh error" });
  }
};

export { register, updatePassword, login, refresh };
