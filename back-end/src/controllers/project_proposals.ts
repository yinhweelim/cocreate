import { Request, Response, query } from "express";
import { pool } from "../db/db";

const getProposalsByProjectId = async (req: Request, res: Response) => {
  try {
    //if project not found, return error
    const getProjectQuery = "SELECT * FROM projects WHERE id = $1";
    const result = await pool.query(getProjectQuery, [req.params.project_id]);
    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "project not found" });
    }

    //get proposals with project_id
    const getProposalsQuery =
      "SELECT * FROM project_proposals WHERE project_id = $1 AND is_deleted = false";
    const results = await pool.query(getProposalsQuery, [
      req.params.project_id,
    ]);
    const proposals = results.rows;

    res.status(200).json({ status: "success", proposals });
  } catch (error) {
    console.error("Error getting proposals:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while getting the proposals",
    });
  }
};

//TODO: Add image upload
const createProjectProposal = async (req: Request, res: Response) => {
  try {
    //Create SQL query to create proposal
    const insertQuery =
      "INSERT INTO project_proposals (project_id,reference_image_url,description,currency,project_fee,delivery_fee,additional_fees,total_price,estimated_delivery_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";

    const {
      project_id,
      reference_image_url,
      description,
      currency,
      project_fee,
      delivery_fee,
      additional_fees,
      total_price,
      estimated_delivery_date,
    } = req.body;

    const values = [
      project_id,
      reference_image_url,
      description,
      currency,
      project_fee,
      delivery_fee || null,
      additional_fees || null,
      total_price,
      new Date(estimated_delivery_date) || null,
    ];

    //Create proposal
    const proposalResult = await pool.query(insertQuery, values);
    const proposal = proposalResult.rows[0];

    res.status(201).json({ status: "success", proposal });
  } catch (error) {
    console.error("Error creating proposal:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while creating the proposal",
    });
  }
};

const updateProjectProposal = async (req: Request, res: Response) => {
  try {
    // Build the UPDATE query based on request body
    const updateFields = [];
    const queryParams = [req.params.id];

    if ("reference_image_url" in req.body) {
      updateFields.push("reference_image_url = $2");
      queryParams.push(req.body.reference_image_url);
    }

    if ("description" in req.body) {
      updateFields.push("description = $3");
      queryParams.push(req.body.description);
    }

    if ("currency" in req.body) {
      updateFields.push("currency = $4");
      queryParams.push(req.body.currency);
    }

    if ("project_fee" in req.body) {
      updateFields.push("project_fee = $5");
      queryParams.push(req.body.project_fee);
    }

    if ("delivery_fee" in req.body) {
      updateFields.push("delivery_fee = $6");
      queryParams.push(req.body.delivery_fee);
    }

    if ("additional_fees" in req.body) {
      updateFields.push("additional_fees = $7");
      queryParams.push(req.body.additional_fees);
    }

    if ("total_price" in req.body) {
      updateFields.push("total_price = $8");
      queryParams.push(req.body.total_price);
    }

    if ("estimated_delivery_date" in req.body) {
      updateFields.push("estimated_delivery_date = $9");
      queryParams.push(req.body.estimated_delivery_date);
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
      "UPDATE project_proposals SET " +
      updateFields.join(", ") +
      " WHERE id = $1  RETURNING *";

    // Execute the UPDATE query
    const result = await pool.query(updateQuery, queryParams);
    const updatedProposal = result.rows[0];

    res.status(200).json({
      status: "success",
      msg: "Proposal updated successfully",
      updated_proposal: updatedProposal,
    });
  } catch (error) {
    console.error("Error updating proposal:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while updating the proposal",
    });
  }
};

export {
  getProposalsByProjectId,
  createProjectProposal,
  updateProjectProposal,
};
