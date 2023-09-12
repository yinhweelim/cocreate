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

const getBriefByCreatorId = async (req: Request, res: Response) => {
  try {
    //if creator not found, return error
    const getCreatorById = "SELECT * FROM creators WHERE id = $1";
    const result = await pool.query(getCreatorById, [req.params.creator_id]);
    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "creator not found" });
    }

    //get briefs with creator_id
    const getBriefsQuery =
      "SELECT * FROM project_briefs WHERE creator_id = $1 AND is_deleted = false";
    const results = await pool.query(getBriefsQuery, [req.params.creator_id]);
    const briefs = results.rows;

    res.status(200).json({ status: "success", briefs });
  } catch (error) {
    console.error("Error getting briefs:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while getting the briefs",
    });
  }
};

const getBriefByPatronId = async (req: Request, res: Response) => {
  try {
    //if patron not found, return error
    const getPatronById = "SELECT * FROM users WHERE id = $1";
    const result = await pool.query(getPatronById, [req.params.patron_id]);
    if (result.rows.length === 0) {
      return res.status(400).json({ status: "error", msg: "patron not found" });
    }

    //get briefs with patron_id
    const getBriefsQuery =
      "SELECT * FROM project_briefs WHERE patron_id = $1 AND is_deleted = false";
    const results = await pool.query(getBriefsQuery, [req.params.patron_id]);
    const briefs = results.rows;

    res.status(200).json({ status: "success", briefs });
  } catch (error) {
    console.error("Error getting briefs:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while getting the briefs",
    });
  }
};

//accepts a multipart form containing image and body params. creates a brief
const createBrief = async (req: Request, res: Response) => {
  try {
    const {
      creator_id,
      product_id,
      patron_id,
      details,
      budget_currency,
      budget_amount,
      deadline,
      consultation_slot,
      delivery_method,
    } = req.body;
    const imageFile = req.file;
    const imageId = v4(); //generate uuid for image

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
      .jpeg({ quality: 80 })
      .toBuffer();

    //send image to s3
    const params = {
      Bucket: bucketName,
      Key: `${patron_id}-brief-${imageId}.jpeg`, //create unique file name to prevent overrides due to same name
      Body: buffer,
      ContentType: imageFile.mimetype,
      ACL: "public-read", // Make the object publicly accessible
    };

    const command = new PutObjectCommand(params);

    await s3.send(command);

    //generate imageURL
    const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${params.Key}`;

    //Create SQL query to create brief
    const insertQuery =
      "INSERT INTO project_briefs (creator_id, product_id, patron_id, details,budget_currency,budget_amount,deadline,consultation_slot,delivery_method,image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) RETURNING *";

    //construct query values
    const values = [
      creator_id,
      product_id,
      patron_id,
      details,
      budget_currency,
      budget_amount,
      new Date(deadline),
      new Date(consultation_slot),
      delivery_method,
      imageUrl,
    ];

    //Create brief
    const briefResult = await pool.query(insertQuery, values);
    const brief = briefResult.rows[0];

    res.status(201).json({ status: "success", brief });
  } catch (error) {
    console.error("Error creating brief:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while creating the brief",
    });
  }
};

const updateBrief = async (req: Request, res: Response) => {
  try {
    //if brief not found, return error
    const getBriefsQuery = "SELECT * FROM project_briefs WHERE id = $1";
    const queryResult = await pool.query(getBriefsQuery, [req.params.id]);
    if (queryResult.rows.length === 0) {
      return res.status(400).json({ status: "error", msg: "brief not found" });
    }

    // Build the UPDATE query based on request body
    const updateFields = [];
    const queryParams = [req.params.id];

    if ("details" in req.body) {
      updateFields.push("details = $" + (queryParams.length + 1));
      queryParams.push(req.body.details);
    }

    if ("budget_currency" in req.body) {
      updateFields.push("budget_currency = $" + (queryParams.length + 1));
      queryParams.push(req.body.budget_currency);
    }

    if ("budget_amount" in req.body) {
      updateFields.push("budget_amount = $" + (queryParams.length + 1));
      queryParams.push(req.body.budget_amount);
    }

    if ("deadline" in req.body) {
      updateFields.push("deadline = $" + (queryParams.length + 1));
      queryParams.push(req.body.deadline);
    }

    if ("consultation_slot" in req.body) {
      updateFields.push("consultation_slot = $" + (queryParams.length + 1));
      queryParams.push(req.body.consultation_slot);
    }

    if ("delivery_method" in req.body) {
      updateFields.push("delivery_method = $" + (queryParams.length + 1));
      queryParams.push(req.body.delivery_method);
    }

    if ("status" in req.body) {
      updateFields.push("status = $" + (queryParams.length + 1));
      queryParams.push(req.body.status);
    }

    if ("product_id" in req.body) {
      updateFields.push("product_id = $" + (queryParams.length + 1));
      queryParams.push(req.body.product_id);
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
      "UPDATE project_briefs SET " +
      updateFields.join(", ") +
      " WHERE id = $1  RETURNING *";

    // Execute the UPDATE query
    const result = await pool.query(updateQuery, queryParams);
    const updatedBrief = result.rows[0];

    res.status(200).json({
      status: "success",
      msg: "Brief updated successfully",
      updated_brief: updatedBrief,
    });
  } catch (error) {
    console.error("Error updating brief:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while updating the brief",
    });
  }
};

export { getBriefByCreatorId, getBriefByPatronId, createBrief, updateBrief };
