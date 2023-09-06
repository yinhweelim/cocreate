import { Request, Response, query } from "express";
import { pool } from "../db/db";
import { link } from "fs";

const getSocialLinksByCreatorId = async (req: Request, res: Response) => {
  try {
    //if creator not found, return error
    const getCreatorById = "SELECT * FROM creators WHERE id = $1";
    const result = await pool.query(getCreatorById, [req.params.creator_id]);
    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "creator not found" });
    }

    //get links with creator_id
    const getLinksQuery =
      "SELECT * FROM creator_social_links WHERE creator_id = $1 AND is_deleted = false";
    const results = await pool.query(getLinksQuery, [req.params.creator_id]);
    const links = results.rows;

    res.status(200).json({ status: "success", links });
  } catch (error) {
    console.error("Error getting links:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while getting the link",
    });
  }
};

const createSocialLink = async (req: Request, res: Response) => {
  try {
    // Check if the creator exists
    const getCreatorById = "SELECT * FROM creators WHERE id = $1";
    const result = await pool.query(getCreatorById, [req.params.creator_id]);

    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "creator not found" });
    }

    //Create SQL query to create product
    const insertLinkQuery =
      "INSERT INTO creator_social_links (type, url, creator_id) VALUES ($1, $2, $3)";

    const { type, url } = req.body;
    const linkValues = [type, url, req.params.creator_id];

    //Create link
    await pool.query(insertLinkQuery, linkValues);

    res
      .status(201)
      .json({ status: "success", msg: "Social media link added successfully" });
  } catch (error) {
    console.error("Error creating link:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while creating the social media link",
    });
  }
};

const updateSocialLink = async (req: Request, res: Response) => {
  try {
    // Build the UPDATE query based on request body
    const updateFields = [];
    const queryParams = [req.params.id];

    if ("type" in req.body) {
      updateFields.push("type = $" + (queryParams.length + 1));
      queryParams.push(req.body.type);
    }

    if ("url" in req.body) {
      updateFields.push("url = $" + (queryParams.length + 1));
      queryParams.push(req.body.url);
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
      "UPDATE creator_social_links SET " +
      updateFields.join(", ") +
      " WHERE id = $1";

    // Execute the UPDATE query
    await pool.query(updateQuery, queryParams);

    res.status(200).json({
      status: "success",
      msg: "Social media link updated successfully",
    });
  } catch (error) {
    console.error("Error updating social media link:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while updating the social media link",
    });
  }
};

const deleteSocialLink = async (req: Request, res: Response) => {
  try {
    const queryParams = [req.params.id];

    const updateQuery =
      "UPDATE creator_social_links SET is_deleted = true WHERE id = $1";

    await pool.query(updateQuery, queryParams);

    res.status(200).json({
      status: "success",
      msg: "Social media link deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting social media link:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while deleting the social media link",
    });
  }
};

export {
  getSocialLinksByCreatorId,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
};
