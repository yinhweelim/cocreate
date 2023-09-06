import { Request, Response, query } from "express";
import { pool } from "../db/db";

const getTestimonials = async (req: Request, res: Response) => {
  try {
    //if creator not found, return error
    const getCreatorById = "SELECT * FROM creators WHERE id = $1";
    const result = await pool.query(getCreatorById, [req.params.creator_id]);
    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "creator not found" });
    }

    //get testimonials with creator_id
    const getTestimonialsQuery =
      "SELECT * FROM creator_testimonials WHERE creator_id = $1 AND is_deleted = false";
    const results = await pool.query(getTestimonialsQuery, [
      req.params.creator_id,
    ]);
    const testimonials = results.rows;

    res.status(200).json({ status: "success", testimonials });
  } catch (error) {
    console.error("Error getting testimonials:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while getting the testimonials",
    });
  }
};

const createTestimonial = async (req: Request, res: Response) => {
  try {
    // Check if the creator exists
    const getCreatorById = "SELECT * FROM creators WHERE id = $1";
    const creatorResult = await pool.query(getCreatorById, [
      req.params.creator_id,
    ]);

    if (creatorResult.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "creator not found" });
    }

    //Create SQL query to create product
    const insertTestimonialQuery =
      "INSERT INTO creator_testimonials (image_url, testimonial, creator_id, project_id, patron_id, patron_tagline) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";

    const {
      image_url,
      testimonial,
      creator_id,
      project_id,
      patron_id,
      patron_tagline,
    } = req.body;

    const testimonialValues = [
      image_url,
      testimonial,
      req.params.creator_id,
      project_id,
      patron_id,
      patron_tagline,
    ];

    //Create product
    const testimonialResult = await pool.query(
      insertTestimonialQuery,
      testimonialValues
    );
    const newTestimonial = testimonialResult.rows[0];

    res.status(201).json({ status: "success", testimonial: newTestimonial });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred while creating the testimonial",
    });
  }
};

export { getTestimonials, createTestimonial };
