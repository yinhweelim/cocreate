import { Request, Response, query } from "express";
import { pool } from "../db/db";

const getProductsByCreatorId = async (req: Request, res: Response) => {
  try {
    //if creator not found, return error
    const getCreatorById = "SELECT * FROM creators WHERE id = $1";
    const result = await pool.query(getCreatorById, [req.params.creator_id]);

    console.log(result.rows);

    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "creator not found" });
    }

    //get products with creator_id
    const getProducts = "SELECT * FROM creator_products WHERE creator_id = $1";
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
    // Extract the creator's ID from the result
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

    //create product
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

export { getProductsByCreatorId, createProductForCreator };
