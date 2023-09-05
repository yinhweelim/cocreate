import { Request, Response, query } from "express";
import { pool } from "../db/db";

const getProductsByCreatorId = async (req: Request, res: Response) => {
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
    const getProducts =
      "SELECT * FROM creator_products WHERE creator_id = $1 AND is_deleted = false";
    const results = await pool.query(getProducts, [req.params.creator_id]);
    const products = results.rows;

    res.status(200).json({ status: "success", products });
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while getting the products",
    });
  }
};

const createProductForCreator = async (req: Request, res: Response) => {
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
    const insertProductQuery =
      "INSERT INTO creator_products (image_url, title, description, currency, starting_price, creator_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";

    const { image_url, title, description, currency, starting_price } =
      req.body;
    const productValues = [
      image_url,
      title,
      description,
      currency,
      starting_price,
      req.params.creator_id,
    ];

    //Create product
    const productResult = await pool.query(insertProductQuery, productValues);
    const newProduct = productResult.rows[0];

    res.status(201).json({ status: "success", product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while creating the product",
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

export {
  getProductsByCreatorId,
  createProductForCreator,
  updateProduct,
  deleteProduct,
};