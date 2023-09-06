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
      "SELECT type, url FROM creator_social_links WHERE creator_id = $1 AND is_deleted = false";
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

const updateProduct = async (req: Request, res: Response) => {
  try {
    // Build the UPDATE query based on request body
    const updateFields = [];
    const queryParams = [req.params.id];

    if ("title" in req.body) {
      updateFields.push("title = $2");
      queryParams.push(req.body.title);
    }

    if ("description" in req.body) {
      updateFields.push("description = $3");
      queryParams.push(req.body.description);
    }

    if ("currency" in req.body) {
      updateFields.push("currency = $4");
      queryParams.push(req.body.currency);
    }

    if ("starting_price" in req.body) {
      updateFields.push("starting_price = $5");
      queryParams.push(req.body.starting_price);
    }

    if ("image_url" in req.body) {
      updateFields.push("image_url = $6");
      queryParams.push(req.body.image_url);
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
      "UPDATE creator_products SET " +
      updateFields.join(", ") +
      " WHERE id = $1";

    // Execute the UPDATE query
    await pool.query(updateQuery, queryParams);

    res
      .status(200)
      .json({ status: "success", msg: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while updating the product",
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const queryParams = [req.params.id];

    const updateQuery =
      "UPDATE creator_products SET is_deleted = true WHERE id = $1";

    await pool.query(updateQuery, queryParams);

    res
      .status(200)
      .json({ status: "success", msg: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while deleting the product",
    });
  }
};

export { getSocialLinksByCreatorId, createSocialLink };
