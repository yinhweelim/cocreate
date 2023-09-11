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

//returns an array of portfolio items for that creator_id
const getCreatorPortfolioItem = async (req: Request, res: Response) => {
  try {
    //if creator not found, return error
    const getCreatorById = "SELECT * FROM creators WHERE id = $1";
    const result = await pool.query(getCreatorById, [req.params.creator_id]);
    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "creator not found" });
    }

    //get portfolio with creator_id
    const getItemsQuery =
      "SELECT id, image_url, title, caption FROM creator_portfolio_items WHERE creator_id = $1 AND is_deleted = false";
    const results = await pool.query(getItemsQuery, [req.params.creator_id]);
    const items = results.rows;

    res.status(200).json({ status: "success", items });
  } catch (error) {
    console.error("Error getting items:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while getting the items",
    });
  }
};

//accepts a multipart form containing image and body params. creates a portfolio item
const uploadCreatorPortfolioItem = async (req: Request, res: Response) => {
  try {
    const imageFile = req.file;
    const title = req.body.title;
    const caption = req.body.caption;
    const creatorId = req.params.creator_id;
    const imageId = v4(); //generate uuid for image

    // Check if the creator exists before processing
    const getCreatorById = "SELECT * FROM creators WHERE id = $1";
    const result = await pool.query(getCreatorById, [creatorId]);
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
      })

      .toBuffer();

    //send image to s3
    const params = {
      Bucket: bucketName,
      Key: `${creatorId}-portfolio-${imageId}.jpeg`, //create unique file name to prevent overrides due to same name
      Body: buffer,
      ContentType: imageFile.mimetype,
      ACL: "public-read", // Make the object publicly accessible
    };

    const command = new PutObjectCommand(params);

    await s3.send(command);

    //TODO: generate presigned url https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
    //generate URL
    const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${params.Key}`;

    //Create SQL query to upload image to database
    const insertItemQuery =
      "INSERT INTO creator_portfolio_items (image_url, title, caption, creator_id) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [imageUrl, title, caption, creatorId];
    const itemResult = await pool.query(insertItemQuery, values);
    const newItem = itemResult.rows[0];

    res.status(201).json({ status: "success", item: newItem });
  } catch (error) {
    console.error("Error uploading item:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while uploading item",
    });
  }
};

//delete item using id
const deleteCreatorPortfolioItem = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;

    // Check if the image exists before processing
    const getQuery = "SELECT * FROM creator_portfolio_items WHERE id = $1";
    const result = await pool.query(getQuery, [itemId]);
    if (result.rows.length === 0) {
      return res.status(400).json({ status: "error", msg: "item not found" });
    }

    const updateQuery =
      "UPDATE creator_portfolio_items SET is_deleted = true WHERE id = $1";
    await pool.query(updateQuery, [itemId]);
    res
      .status(200)
      .json({ status: "success", msg: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while deleting the item",
    });
  }
};

export {
  getCreatorPortfolioItem,
  uploadCreatorPortfolioItem,
  deleteCreatorPortfolioItem,
};
