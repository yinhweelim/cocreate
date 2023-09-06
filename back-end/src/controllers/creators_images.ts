import { Request, Response, query } from "express";
import { pool } from "../db/db";

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

export {
  getCreatorGalleryImages,
  uploadCreatorGalleryImage,
  deleteCreatorGalleryImage,
};
