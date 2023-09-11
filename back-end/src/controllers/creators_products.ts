import { Request, Response, query } from "express";
import { pool } from "../db/db";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"; //AWS s3 client
import sharp from "sharp";
import { v4 } from "uuid";

const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKeyId || "",
    secretAccessKey: secretAccessKey || "",
  },
  region: region || "",
});

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

//accepts a multipart form containing image and body params. creates a product
const createProductForCreator = async (req: Request, res: Response) => {
  try {
    console.log("request received");
    const imageFile = req.file;
    const title = req.body.title;
    const description = req.body.caption;
    const currency = req.body.currency;
    const starting_price = req.body.starting_price;
    const creatorId = req.params.creator_id;
    const imageId = v4(); //generate uuid for image

    // Check if the creator exists before processing
    const getCreatorById = "SELECT * FROM creators WHERE id = $1";
    const result = await pool.query(getCreatorById, [req.params.creator_id]);

    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "creator not found" });
    }

    // Check if imageFile is defined before processing
    if (!imageFile) {
      return res
        .status(400)
        .json({ status: "error", msg: "image file not provided" });
    }

    //resize image
    const buffer = await sharp(imageFile.buffer)
      .resize({
        fit: sharp.fit.contain,
        width: 400,
        height: 400,
      })
      .jpeg({ quality: 80 })
      .toBuffer();

    //send image to s3
    const params = {
      Bucket: bucketName,
      Key: `${creatorId}-product-${imageId}.jpeg`, //create unique file name to prevent overrides due to same name
      Body: buffer,
      ContentType: imageFile.mimetype,
      ACL: "public-read", // Make the object publicly accessible
    };

    const command = new PutObjectCommand(params);

    await s3.send(command);

    //TODO: generate presigned url https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
    //generate URL
    const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${params.Key}`;

    //Create SQL query to create product
    const insertProductQuery =
      "INSERT INTO creator_products (image_url, title, description, currency, starting_price, creator_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";

    const productValues = [
      imageUrl,
      title,
      description,
      currency,
      starting_price,
      creatorId,
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
      updateFields.push("title = $" + (queryParams.length + 1));
      queryParams.push(req.body.title);
    }

    if ("description" in req.body) {
      updateFields.push("description = $" + (queryParams.length + 1));
      queryParams.push(req.body.description);
    }

    if ("currency" in req.body) {
      updateFields.push("currency = $" + (queryParams.length + 1));
      queryParams.push(req.body.currency);
    }

    if ("starting_price" in req.body) {
      updateFields.push("starting_price = $" + (queryParams.length + 1));
      queryParams.push(req.body.starting_price);
    }

    if ("image_url" in req.body) {
      updateFields.push("image_url = $" + (queryParams.length + 1));
      queryParams.push(req.body.image_url);
    }

    if ("is_deleted" in req.body) {
      updateFields.push("is_deleted = $" + (queryParams.length + 1));
      queryParams.push(req.body.is_deleted);
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
