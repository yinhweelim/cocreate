import { Request, Response, query } from "express";
import { pool } from "../db/db";

const getProjectStages = async (req: Request, res: Response) => {
  try {
    //if creator not found, return error
    const getCreatorById = "SELECT * FROM creators WHERE id = $1";
    const result = await pool.query(getCreatorById, [req.params.creator_id]);
    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "creator not found" });
    }

    //get products with creator_id
    const getProjectStages =
      "SELECT * FROM creator_project_stages WHERE creator_id = $1 AND is_deleted = false";
    const results = await pool.query(getProjectStages, [req.params.creator_id]);
    const projectStages = results.rows;

    res.status(200).json({ status: "success", projectStages });
  } catch (error) {
    console.error("Error getting project stages:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while getting the project stages",
    });
  }
};

const setProjectStages = async (req: Request, res: Response) => {
  const client = await pool.connect(); // Acquire a client from the pool

  try {
    // Check if the creator exists
    const getCreatorById = "SELECT * FROM creators WHERE id = $1";
    const creatorResult = await pool.query(getCreatorById, [
      req.params.creator_id,
    ]);

    if (creatorResult.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "creator not found" });
    }

    // Start a transaction
    await client.query("BEGIN");

    // Mark existing project stages as deleted for the given creator_id
    const markAsDeletedQuery =
      "UPDATE creator_project_stages SET is_deleted = true WHERE creator_id = $1";
    await client.query(markAsDeletedQuery, [req.params.creator_id]);

    // Extract project stages from the request body
    const projectStagesData = req.body;

    const newProjectStages = [];

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
        req.params.creator_id,
      ];

      const result = await pool.query(insertProjectStageQuery, values);
      newProjectStages.push(result.rows[0]);
    }
    // Commit the transaction
    await client.query("COMMIT");
    res
      .status(201)
      .json({ status: "success", projectStages: newProjectStages });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error setting the project stages:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while setting the project stages",
    });
  } finally {
    // Release the client back to the pool
    client.release();
  }
};

export { getProjectStages, setProjectStages };
