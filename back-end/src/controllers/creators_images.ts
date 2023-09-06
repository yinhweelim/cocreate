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

//returns an array of gallery images for that creator_id
const getCreatorGalleryImages = async (req: Request, res: Response) => {
  try {
    console.log("here");
    //if creator not found, return error
    const getCreatorById = "SELECT * FROM creators WHERE id = $1";
    const result = await pool.query(getCreatorById, [req.params.creator_id]);
    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "creator not found" });
    }

    //get images with creator_id
    const getImagesQuery =
      "SELECT id, image_url, caption FROM creator_gallery_images WHERE creator_id = $1 AND is_deleted = false";
    const results = await pool.query(getImagesQuery, [req.params.creator_id]);
    const images = results.rows;

    res.status(200).json({ status: "success", images });
  } catch (error) {
    console.error("Error getting images:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while getting the images",
    });
  }
};

const uploadCreatorGalleryImage = async (req: Request, res: Response) => {
  try {
    const imageFile = req.file;
    const caption = req.body.caption;
    const creatorId = req.params.creator_id;
    const imageId = v4; //generate uuid for image

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
        height: 400,
      })
      .jpeg({ quality: 80 })
      .toBuffer();

    //send image to s3
    const params = {
      Bucket: bucketName,
      Key: `${creatorId}-gallery-${imageId}.jpeg`, //create unique file name to prevent overrides due to same name
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
    const insertImageQuery =
      "INSERT INTO creator_gallery_images (id, image_url, caption, creator_id) VALUES ($1, $2, $3, $4) RETURNING *";
    const imageValues = [imageId, imageUrl, caption, creatorId];
    const imageResult = await pool.query(insertImageQuery, imageValues);
    const newImage = imageResult.rows[0];

    res.status(201).json({ status: "success", image: newImage });
  } catch (error) {
    console.error("Error uploading gallery image:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while uploading gallery image",
    });
  }
};

//delete image using id
const deleteCreatorGalleryImage = async (req: Request, res: Response) => {
  try {
    const imageId = req.params.id;

    // Check if the image exists before processing
    const getImageQuery = "SELECT * FROM creator_gallery_images WHERE id = $1";
    const result = await pool.query(getImageQuery, [imageId]);
    if (result.rows.length === 0) {
      return res.status(400).json({ status: "error", msg: "image not found" });
    }

    const updateQuery =
      "UPDATE creator_gallery_images SET is_deleted = true WHERE id = $1";
    await pool.query(updateQuery, [imageId]);
    res
      .status(200)
      .json({ status: "success", msg: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while deleting the image",
    });
  }
};

export {
  getCreatorGalleryImages,
  uploadCreatorGalleryImage,
  deleteCreatorGalleryImage,
};
