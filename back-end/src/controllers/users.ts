import { Request, Response, query } from "express";
import { v4 } from "uuid";
const uuidv4 = v4;
import { pool } from "../db/db";

const updateUser = async (req: Request, res: Response) => {
  try {
    //check whether user exists before proceeding
    const checkUserQuery = "SELECT * FROM users WHERE id = $1";
    const result = await pool.query(checkUserQuery, [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(400).json({ status: "error", msg: "user not found" });
    }

    // Build the UPDATE query based on request body
    const updateFields = [];
    const queryParams = [req.params.id];

    if ("country_of_residence" in req.body) {
      updateFields.push("country_of_residence = $2");
      queryParams.push(req.body.country_of_residence);
    }

    if ("avatar_image_url" in req.body) {
      updateFields.push("avatar_image_url = $3");
      queryParams.push(req.body.avatar_image_url);
    }

    if ("given_name" in req.body) {
      updateFields.push("given_name = $4");
      queryParams.push(req.body.given_name);
    }

    if ("last_name" in req.body) {
      updateFields.push("last_name = $5");
      queryParams.push(req.body.last_name);
    }
    console.log(queryParams);
    if (updateFields.length === 0) {
      // No fields to update
      return res.status(400).json({
        status: "error",
        msg: "No valid fields provided for update",
      });
    }

    // Construct the final SQL UPDATE query
    const updateQuery =
      "UPDATE users SET " + updateFields.join(", ") + " WHERE id = $1";

    // Execute the UPDATE query
    await pool.query(updateQuery, queryParams);

    res
      .status(200)
      .json({ status: "success", msg: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while updating the user",
    });
  }
};

export { updateUser };
