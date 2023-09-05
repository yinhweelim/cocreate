import { Request, Response, query } from "express";
import { v4 } from "uuid";
const uuidv4 = v4;
import { pool } from "../db/db";

const getCreatorById = async (req: Request, res: Response) => {
  try {
    //if creator not found, return error
    const getCreatorById = "SELECT * FROM creators WHERE id = $1";
    const result = await pool.query(getCreatorById, [req.params.id]);
    const creator = result.rows[0];

    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "creator not found" });
    }
    res.status(200).json({ status: "success", creator: creator });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while getting the creator",
    });
  }
};

const updateCreator = async (req: Request, res: Response) => {
  try {
    //if creator not found, return error
    const getCreatorById = "SELECT * FROM creators WHERE id = $1";
    const result = await pool.query(getCreatorById, [req.params.id]);

    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "creator not found" });
    }

    // Build the UPDATE query based on request body
    const updateFields = [];
    const queryParams = [req.params.id];

    if ("display_name" in req.body) {
      updateFields.push("display_name = $2");
      queryParams.push(req.body.display_name);
    }

    if ("tagline" in req.body) {
      updateFields.push("tagline = $3");
      queryParams.push(req.body.tagline);
    }

    if ("country_of_operation" in req.body) {
      updateFields.push("country_of_operation = $4");
      queryParams.push(req.body.country_of_operation);
    }

    if ("about" in req.body) {
      updateFields.push("about = $5");
      queryParams.push(req.body.about);
    }

    if ("logo_image_url" in req.body) {
      updateFields.push("logo_image_url = $6");
      queryParams.push(req.body.logo_image_url);
    }

    if ("slots_per_month" in req.body) {
      updateFields.push("slots_per_month = $7");
      queryParams.push(req.body.slots_per_month);
    }

    if ("display_slots_per_month" in req.body) {
      updateFields.push("display_slots_per_month = $8");
      queryParams.push(req.body.display_slots_per_month);
    }

    if ("display_project_count" in req.body) {
      updateFields.push("display_project_count = $9");
      queryParams.push(req.body.display_project_count);
    }

    if ("allow_consultation_booking" in req.body) {
      updateFields.push("allow_consultation_booking = $10");
      queryParams.push(req.body.allow_consultation_booking);
    }

    if ("consultation_notice_days" in req.body) {
      updateFields.push("consultation_notice_days = $11");
      queryParams.push(req.body.consultation_notice_days);
    }

    if ("lead_time_in_weeks" in req.body) {
      updateFields.push("lead_time_in_weeks = $12");
      queryParams.push(req.body.lead_time_in_weeks);
    }

    if ("project_description_guideline" in req.body) {
      updateFields.push("project_description_guideline = $13");
      queryParams.push(req.body.project_description_guideline);
    }

    if ("payment_instructions" in req.body) {
      updateFields.push("payment_instructions = $14");
      queryParams.push(req.body.payment_instructions);
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
      "UPDATE creators SET " + updateFields.join(", ") + " WHERE id = $1";

    // Execute the UPDATE query
    await pool.query(updateQuery, queryParams);

    res
      .status(200)
      .json({ status: "success", msg: "Creator updated successfully" });
  } catch (error) {
    console.error("Error updating creator:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while updating the creator",
    });
  }
};

export { getCreatorById, updateCreator };
