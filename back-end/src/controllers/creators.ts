import { Request, Response, query } from "express";
import { pool } from "../db/db";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"; //AWS s3 client
import sharp from "sharp";
import { v4 } from "uuid";
const uuidv4 = v4;

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

const getCreatorById = async (req: Request, res: Response) => {
  try {
    //if creator not found, return error
    const getCreatorById = "SELECT * FROM creators WHERE id = $1";
    const result = await pool.query(getCreatorById, [req.params.id]);
    const creator = result.rows[0];

    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "creator not found" });
    }
    res.status(200).json({ status: "success", creator: creator });
  } catch (error) {
    console.error("Error getting creator:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while getting the creator",
    });
  }
};

const updateCreator = async (req: Request, res: Response) => {
  try {
    //if creator not found, return error
    const getCreatorById = "SELECT * FROM creators WHERE id = $1";
    const result = await pool.query(getCreatorById, [req.params.id]);

    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "creator not found" });
    }

    // Build the UPDATE query based on request body
    const updateFields = [];
    const queryParams = [req.params.id];

    if ("display_name" in req.body) {
      updateFields.push("display_name = $" + (queryParams.length + 1));
      queryParams.push(req.body.display_name);
    }

    if ("tagline" in req.body) {
      updateFields.push("tagline = $" + (queryParams.length + 1));
      queryParams.push(req.body.tagline);
    }

    if ("country_of_operation" in req.body) {
      updateFields.push("country_of_operation = $" + (queryParams.length + 1));
      queryParams.push(req.body.country_of_operation);
    }

    if ("about" in req.body) {
      updateFields.push("about = $" + (queryParams.length + 1));
      queryParams.push(req.body.about);
    }

    if ("logo_image_url" in req.body) {
      updateFields.push("logo_image_url = $" + (queryParams.length + 1));
      queryParams.push(req.body.logo_image_url);
    }

    if ("slots_per_month" in req.body) {
      updateFields.push("slots_per_month = $" + (queryParams.length + 1));
      queryParams.push(req.body.slots_per_month);
    }

    if ("display_slots_per_month" in req.body) {
      updateFields.push(
        "display_slots_per_month = $" + (queryParams.length + 1)
      );
      queryParams.push(req.body.display_slots_per_month);
    }

    if ("display_project_count" in req.body) {
      updateFields.push("display_project_count = $" + (queryParams.length + 1));
      queryParams.push(req.body.display_project_count);
    }

    if ("allow_consultation_booking" in req.body) {
      updateFields.push(
        "allow_consultation_booking = $" + (queryParams.length + 1)
      );
      queryParams.push(req.body.allow_consultation_booking);
    }

    if ("consultation_notice_days" in req.body) {
      updateFields.push(
        "consultation_notice_days = $" + (queryParams.length + 1)
      );
      queryParams.push(req.body.consultation_notice_days);
    }

    if ("lead_time_in_weeks" in req.body) {
      updateFields.push("lead_time_in_weeks = $" + (queryParams.length + 1));
      queryParams.push(req.body.lead_time_in_weeks);
    }

    if ("project_description_guideline" in req.body) {
      updateFields.push(
        "project_description_guideline = $" + (queryParams.length + 1)
      );
      queryParams.push(req.body.project_description_guideline);
    }

    if ("payment_instructions" in req.body) {
      updateFields.push("payment_instructions = $" + (queryParams.length + 1));
      queryParams.push(req.body.payment_instructions);
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
      "UPDATE creators SET " + updateFields.join(", ") + " WHERE id = $1";

    // Execute the UPDATE query
    await pool.query(updateQuery, queryParams);

    res
      .status(200)
      .json({ status: "success", msg: "Creator updated successfully" });
  } catch (error) {
    console.error("Error updating creator:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while updating the creator",
    });
  }
};

//upload and update logo

const updateCreatorLogo = async (req: Request, res: Response) => {
  try {
    const creatorId = req.params.creator_id;
    const imageFile = req.file;
    const imageId = uuidv4(); //generate uuid for image

    //check whether creator exists before proceeding
    const checkQuery = "SELECT * FROM creators WHERE id = $1";
    const result = await pool.query(checkQuery, [creatorId]);

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
        width: 300,
      })
      .toBuffer();

    //send image to s3
    const params = {
      Bucket: bucketName,
      Key: `${creatorId}-creatorlogo-${imageId}.jpeg`, //create unique file name to prevent overrides due to same name
      Body: buffer,
      ContentType: imageFile.mimetype,
      ACL: "public-read", // Make the object publicly accessible
    };

    const command = new PutObjectCommand(params);

    await s3.send(command);

    //generate URL
    const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${params.Key}`;

    // Construct the final SQL UPDATE query
    const updateQuery =
      "UPDATE creators SET logo_image_url = $1 WHERE id = $2 RETURNING *";

    // Execute the UPDATE query
    const creatorResult = await pool.query(updateQuery, [
      imageUrl,
      req.params.creator_id,
    ]);
    const updatedCreator = creatorResult.rows[0];

    res.status(200).json({
      status: "success",
      msg: "Creator logo updated successfully",
      creator: creatorResult.rows[0],
    });
  } catch (error) {
    console.error("Error updating logo:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while updating the logo",
    });
  }
};

export { getCreatorById, updateCreator, updateCreatorLogo };
