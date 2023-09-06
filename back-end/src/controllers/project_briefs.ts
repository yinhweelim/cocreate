import { Request, Response, query } from "express";
import { pool } from "../db/db";

const getBriefByCreatorId = async (req: Request, res: Response) => {
  try {
    //if creator not found, return error
    const getCreatorById = "SELECT * FROM creators WHERE id = $1";
    const result = await pool.query(getCreatorById, [req.params.creator_id]);
    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "creator not found" });
    }

    //get briefs with creator_id
    const getBriefsQuery =
      "SELECT * FROM project_briefs WHERE creator_id = $1 AND is_deleted = false";
    const results = await pool.query(getBriefsQuery, [req.params.creator_id]);
    const briefs = results.rows;

    res.status(200).json({ status: "success", briefs });
  } catch (error) {
    console.error("Error getting briefs:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while getting the briefs",
    });
  }
};

const getBriefByPatronId = async (req: Request, res: Response) => {
  try {
    //if patron not found, return error
    const getPatronById = "SELECT * FROM users WHERE id = $1";
    const result = await pool.query(getPatronById, [req.params.patron_id]);
    if (result.rows.length === 0) {
      return res.status(400).json({ status: "error", msg: "patron not found" });
    }

    //get briefs with patron_id
    const getBriefsQuery =
      "SELECT * FROM project_briefs WHERE patron_id = $1 AND is_deleted = false";
    const results = await pool.query(getBriefsQuery, [req.params.patron_id]);
    const briefs = results.rows;

    res.status(200).json({ status: "success", briefs });
  } catch (error) {
    console.error("Error getting briefs:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while getting the briefs",
    });
  }
};

//TODO: Add image upload
const createBrief = async (req: Request, res: Response) => {
  try {
    //Create SQL query to create brief
    const insertQuery =
      "INSERT INTO project_briefs (creator_id, product_id, patron_id, details,budget_currency,budget_amount,deadline,consultation_slot,delivery_method) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";

    const {
      creator_id,
      product_id,
      patron_id,
      details,
      budget_currency,
      budget_amount,
      deadline,
      consultation_slot,
      delivery_method,
    } = req.body;

    const values = [
      creator_id,
      product_id,
      patron_id,
      details,
      budget_currency,
      budget_amount,
      deadline,
      consultation_slot,
      delivery_method,
    ];

    //Create brief
    const briefResult = await pool.query(insertQuery, values);
    const brief = briefResult.rows[0];

    res.status(201).json({ status: "success", brief });
  } catch (error) {
    console.error("Error creating brief:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while creating the brief",
    });
  }
};

const updateBrief = async (req: Request, res: Response) => {
  try {
    // Build the UPDATE query based on request body
    const updateFields = [];
    const queryParams = [req.params.id];

    if ("details" in req.body) {
      updateFields.push("details = $2");
      queryParams.push(req.body.details);
    }

    if ("budget_currency" in req.body) {
      updateFields.push("budget_currency = $3");
      queryParams.push(req.body.budget_currency);
    }

    if ("budget_amount" in req.body) {
      updateFields.push("budget_amount = $4");
      queryParams.push(req.body.budget_amount);
    }

    if ("deadline" in req.body) {
      updateFields.push("deadline = $5");
      queryParams.push(req.body.deadline);
    }

    if ("consultation_slot" in req.body) {
      updateFields.push("consultation_slot = $6");
      queryParams.push(req.body.consultation_slot);
    }

    if ("delivery_method" in req.body) {
      updateFields.push("delivery_method = $7");
      queryParams.push(req.body.delivery_method);
    }

    if ("status" in req.body) {
      updateFields.push("status = $8");
      queryParams.push(req.body.status);
    }

    if ("product_id" in req.body) {
      updateFields.push("product_id = $8");
      queryParams.push(req.body.product_id);
    }

    if (updateFields.length === 0) {
      // No fields to update
      return res.status(400).json({
        status: "error",
        msg: "No valid fields provided for update",
      });
    }

    // Construct the final SQL UPDATE query
    const updateQuery =
      "UPDATE project_briefs SET " +
      updateFields.join(", ") +
      " WHERE id = $1  RETURNING *";

    // Execute the UPDATE query
    const result = await pool.query(updateQuery, queryParams);
    const updatedBrief = result.rows[0];

    res
      .status(200)
      .json({
        status: "success",
        msg: "Brief updated successfully",
        updated_brief: updatedBrief,
      });
  } catch (error) {
    console.error("Error updating brief:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while updating the brief",
    });
  }
};

export { getBriefByCreatorId, getBriefByPatronId, createBrief, updateBrief };