import { Request, Response, query } from "express";
import { v4 } from "uuid";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"; //AWS s3 client
import sharp from "sharp";
const uuidv4 = v4;
import { pool } from "../db/db";

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

const updateUser = async (req: Request, res: Response) => {
  try {
    //check whether user exists before proceeding
    const checkUserQuery = "SELECT * FROM users WHERE id = $1";
    const result = await pool.query(checkUserQuery, [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(400).json({ status: "error", msg: "user not found" });
    }

    // Build the UPDATE query based on request body
    const updateFields = [];
    const queryParams = [req.params.id];

    if ("country_of_residence" in req.body) {
      updateFields.push("country_of_residence = $" + (queryParams.length + 1));
      queryParams.push(req.body.country_of_residence);
    }

    if ("avatar_image_url" in req.body) {
      updateFields.push("avatar_image_url = $" + (queryParams.length + 1));
      queryParams.push(req.body.avatar_image_url);
    }

    if ("given_name" in req.body) {
      updateFields.push("given_name = $" + (queryParams.length + 1));
      queryParams.push(req.body.given_name);
    }

    if ("last_name" in req.body) {
      updateFields.push("last_name = $" + (queryParams.length + 1));
      queryParams.push(req.body.last_name);
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
      "UPDATE users SET " + updateFields.join(", ") + " WHERE id = $1";

    // Execute the UPDATE query
    await pool.query(updateQuery, queryParams);

    res
      .status(200)
      .json({ status: "success", msg: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while updating the user",
    });
  }
};

const updateUserAvatar = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const imageFile = req.file;
    const imageId = uuidv4; //generate uuid for image

    //check whether user exists before proceeding
    const checkUserQuery = "SELECT * FROM users WHERE id = $1";
    const result = await pool.query(checkUserQuery, [userId]);

    if (result.rows.length === 0) {
      return res.status(400).json({ status: "error", msg: "user not found" });
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
        width: 100,
        height: 100,
      })
      .jpeg({ quality: 80 })
      .toBuffer();

    //send image to s3
    const params = {
      Bucket: bucketName,
      Key: `${userId}-avatar-${imageId}.jpeg`, //create unique file name to prevent overrides due to same name
      Body: buffer,
      ContentType: imageFile.mimetype,
      ACL: "public-read", // Make the object publicly accessible
    };

    const command = new PutObjectCommand(params);

    await s3.send(command);

    //TODO: generate presigned url https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
    //generate URL
    const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${params.Key}`;

    // Construct the final SQL UPDATE query
    const updateQuery =
      "UPDATE users SET avatar_image_url = $1 WHERE id = $2 RETURNING *";

    // Execute the UPDATE query
    const userResult = await pool.query(updateQuery, [imageUrl, req.params.id]);
    const updatedUser = userResult.rows[0];

    res.status(200).json({
      status: "success",
      msg: "User avatar updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating user avatar:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while updating the user avatar",
    });
  }
};

const getUsersByAuthId = async (req: Request, res: Response) => {
  try {
    //if authId not found, return error
    const authQuery = "SELECT * FROM auth WHERE id = $1";
    const result = await pool.query(authQuery, [req.params.auth_id]);

    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "account not found" });
    }
    //SQL query to get users

    const usersQuery =
      "SELECT id as user_id,role,creator_id,given_name,last_name, avatar_image_url,country_of_residence FROM users WHERE auth_id = $1 ORDER BY role asc";
    const usersResult = await pool.query(usersQuery, [req.params.auth_id]);
    const users = usersResult.rows;

    res.status(200).json({ status: "success", users });
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while getting the users",
    });
  }
};

export { updateUser, updateUserAvatar, getUsersByAuthId };
