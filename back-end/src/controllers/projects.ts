import { Request, Response, query } from "express";
import { pool } from "../db/db";
import uuidValidate from "uuid-validate";
import { get } from "http";

const getProjectByCreatorId = async (req: Request, res: Response) => {
  try {
    //if creator not found, return error
    const getCreatorById = "SELECT * FROM creators WHERE id = $1";
    const result = await pool.query(getCreatorById, [req.params.creator_id]);
    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "creator not found" });
    }

    //1. get projects with creator_id
    const getProjectsQuery = `SELECT DISTINCT
      creators.display_name AS creator_name,
      users.given_name AS patron_name,
      creator_products.image_url AS product_image_url,
      project_briefs.deadline AS requested_deadline,
      project_briefs.budget_currency AS budget_currency,
      project_briefs.budget_amount AS budget_amount,
      project_stages.name AS current_stage,
      project_stages.index AS current_stage_index,
      (
        SELECT
          COUNT(*)
        FROM
          project_stages AS ps
        WHERE
          ps.project_id = projects.id) AS total_stage_count, projects.*
      FROM
        projects
      LEFT JOIN creators ON projects.creator_id = creators.id
      LEFT JOIN users ON projects.patron_id = users.id
      LEFT JOIN project_briefs ON project_briefs.id = projects.brief_id
      LEFT JOIN creator_products ON project_briefs.product_id = creator_products.id
      LEFT JOIN project_stages ON project_stages.id = projects.current_stage_id
    WHERE
      projects.creator_id = $1`;
    const results = await pool.query(getProjectsQuery, [req.params.creator_id]);
    const projects = results.rows;

    res.status(200).json({ status: "success", projects });
  } catch (error) {
    console.error("Error getting projects:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while getting the projects",
    });
  }
};

const getProjectByPatronId = async (req: Request, res: Response) => {
  try {
    //if patron not found, return error
    const getPatronById = "SELECT * FROM users WHERE id = $1";
    const result = await pool.query(getPatronById, [req.params.patron_id]);
    if (result.rows.length === 0) {
      return res.status(400).json({ status: "error", msg: "patron not found" });
    }

    //get projects with patron_id

    const getProjectsQuery = `SELECT DISTINCT
    creators.display_name AS creator_name,
    users.given_name AS patron_name,
    creator_products.image_url AS product_image_url,
    project_briefs.deadline AS requested_deadline,
    project_briefs.budget_currency AS budget_currency,
    project_briefs.budget_amount AS budget_amount,
    project_stages.name AS current_stage,
    project_stages.index AS current_stage_index,
    (
      SELECT
        COUNT(*)
      FROM
        project_stages AS ps
      WHERE
        ps.project_id = projects.id) AS total_stage_count, projects.*
    FROM
      projects
    LEFT JOIN creators ON projects.creator_id = creators.id
    LEFT JOIN users ON projects.patron_id = users.id
    LEFT JOIN project_briefs ON project_briefs.id = projects.brief_id
    LEFT JOIN creator_products ON project_briefs.product_id = creator_products.id
    LEFT JOIN project_stages ON project_stages.id = projects.current_stage_id
  WHERE
    projects.patron_id = $1`;
    const results = await pool.query(getProjectsQuery, [req.params.patron_id]);
    const projects = results.rows;

    res.status(200).json({ status: "success", projects });
  } catch (error) {
    console.error("Error getting projects:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while getting the projects",
    });
  }
};

const getProjectById = async (req: Request, res: Response) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const projectId = req.params.id;

    //1. get project. if project not found, return error
    const getQuery = "SELECT * FROM projects WHERE id = $1";
    const result = await pool.query(getQuery, [projectId]);
    const project = result.rows[0];
    const briefId = result.rows[0].brief_id;
    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "project not found" });
    }

    // 2. get initial brief
    const getBriefQuery =
      "SELECT * FROM project_briefs WHERE id = $1 AND is_deleted = false";
    const getBriefResults = await pool.query(getBriefQuery, [briefId]);
    const brief = getBriefResults.rows[0];
    const productId = getBriefResults.rows[0].product_id;

    // 3. get product option
    const getProductQuery =
      "SELECT * FROM creator_products WHERE id = $1 AND is_deleted = false";
    const getProductResults = await pool.query(getProductQuery, [productId]);
    const product = getProductResults.rows[0];

    // 4. get proposals
    const getProposalsQuery =
      "SELECT * FROM project_proposals WHERE project_id = $1 AND is_deleted = false";
    const getProposalsResults = await pool.query(getProposalsQuery, [
      projectId,
    ]);
    const proposals = getProposalsResults.rows;

    // 5. get project stages
    const getStagesQuery =
      "SELECT * FROM project_stages WHERE project_id = $1 AND is_deleted = false";
    const getStagesResults = await pool.query(getStagesQuery, [projectId]);
    const stages = getStagesResults.rows;

    await client.query("COMMIT"); // Commit the transaction

    res.status(200).json({
      status: "success",
      project,
      brief,
      product,
      proposals,
      stages,
    });
  } catch (error) {
    await client.query("ROLLBACK"); // Roll back the transaction in case of an error

    console.error("Error getting project:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while getting the project",
    });
  } finally {
    client.release();
  }
};

const createProject = async (req: Request, res: Response) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN"); // Begin a database transaction

    //Create SQL query to create project
    const insertQuery =
      "INSERT INTO projects (creator_id, patron_id, brief_id, agreed_proposal_id, agreed_date, current_stage_id, name) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";

    const {
      creator_id,
      patron_id,
      brief_id,
      agreed_proposal_id,
      agreed_date,
      current_stage_id,
      name,
    } = req.body;

    const values = [
      creator_id,
      patron_id,
      brief_id,
      agreed_proposal_id || null, // Use null if not provided
      agreed_date || null, // Use null if not provided
      current_stage_id || null, // Use null if not provided
      name || null,
    ];

    //Create project
    const projectResult = await pool.query(insertQuery, values);
    const project = projectResult.rows[0];
    console.log(project);
    //Add project stages based on creator_project_stages template

    // Step 1: Fetch the template project stages based on creator_id
    const templateStagesQuery =
      "SELECT * FROM creator_project_stages WHERE creator_id = $1 AND is_deleted=false";
    const templateStagesValues = [req.body.creator_id];
    const templateStagesResult = await client.query(
      templateStagesQuery,
      templateStagesValues
    );
    const templateStages = templateStagesResult.rows;
    console.log(templateStages);
    //step 2: store array of items in project_stages database, and set project_id = created project id
    const projectStagesInsertQuery =
      "INSERT INTO project_stages (project_id, index, name, description, time_estimate_unit, time_estimate_start, time_estimate_end) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id";

    const projectStagesPromises = templateStages.map(async (templateStage) => {
      const stageValues = [
        project.id, // Assign the project_id from the newly created project
        templateStage.index,
        templateStage.name,
        templateStage.description,
        templateStage.time_estimate_unit,
        templateStage.time_estimate_start,
        templateStage.time_estimate_end,
      ];
      const stageResult = await client.query(
        projectStagesInsertQuery,
        stageValues
      );
      console.log(stageResult);
      return stageResult.rows[0].id;
    });

    const projectStageIds = await Promise.all(projectStagesPromises);

    // Step 3: Set the first stage as current_stage_id
    const currentStageId = projectStageIds[0];

    // Step 4: Set current_stage_id for the created project
    const updateQuery =
      "UPDATE projects SET current_stage_id = $1 WHERE id = $2 RETURNING *";

    const updatedProjectResult = await client.query(updateQuery, [
      currentStageId,
      project.id,
    ]);
    const updatedProject = updatedProjectResult.rows[0];

    await client.query("COMMIT"); // Commit the transaction
    res.status(201).json({ status: "success", updatedProject });
  } catch (error) {
    await client.query("ROLLBACK"); // Rollback the transaction in case of an error

    console.error("Error creating project:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while creating the project",
    });
  } finally {
    client.release();
  }
};

const updateProject = async (req: Request, res: Response) => {
  try {
    //if project not found, return error
    const getProjectById = "SELECT * FROM projects WHERE id = $1";
    const queryResult = await pool.query(getProjectById, [req.params.id]);
    if (queryResult.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "project not found" });
    }

    // Build the UPDATE query based on request body
    const updateFields = [];
    const queryParams = [req.params.id];

    //validate uuid format
    if ("agreed_proposal_id" in req.body) {
      const agreedProposalId = req.body.agreed_proposal_id;

      if (!uuidValidate(agreedProposalId)) {
        return res.status(400).json({
          status: "error",
          msg: "Invalid agreed_proposal_id format",
        });
      }

      updateFields.push("agreed_proposal_id = $" + (queryParams.length + 1));
      queryParams.push(agreedProposalId);
    }

    if ("agreed_date" in req.body) {
      const agreedDate = new Date(req.body.agreed_date);

      if (isNaN(agreedDate.getTime())) {
        return res.status(400).json({
          status: "error",
          msg: "Invalid agreed_date format",
        });
      }

      // Convert the Date object to a string in ISO 8601 format
      const isoAgreedDate = agreedDate.toISOString();

      updateFields.push("agreed_date = $" + (queryParams.length + 1));
      queryParams.push(isoAgreedDate); // Use the converted ISO date string
    }

    if ("current_stage_id" in req.body) {
      const currentStageId = req.body.current_stage_id;

      if (!uuidValidate(currentStageId)) {
        return res.status(400).json({
          status: "error",
          msg: "Invalid current_stage_id format",
        });
      }

      updateFields.push("current_stage_id = $" + (queryParams.length + 1));
      queryParams.push(currentStageId);
    }

    if ("is_accepted" in req.body) {
      const isAccepted = req.body.is_accepted;
      updateFields.push("is_accepted = $" + (queryParams.length + 1));
      queryParams.push(isAccepted);
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
      "UPDATE projects SET " +
      updateFields.join(", ") +
      " WHERE id = $1 RETURNING *";

    // Execute the UPDATE query
    const result = await pool.query(updateQuery, queryParams);
    const updatedProject = result.rows[0];

    res.status(200).json({
      status: "success",
      msg: "Project updated successfully",
      updated_project: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while updating the project",
    });
  }
};

export {
  getProjectByCreatorId,
  getProjectByPatronId,
  createProject,
  updateProject,
  getProjectById,
};
