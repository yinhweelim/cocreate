import express from "express";
import { getCreatorById, updateCreator } from "../controllers/creators";
import {
  getProductsByCreatorId,
  createProductForCreator,
  updateProduct,
  deleteProduct,
} from "../controllers/creators_products";
import {
  getProjectStages,
  setProjectStages,
} from "../controllers/creators_project_stages";
import {
  getTestimonials,
  createTestimonial,
} from "../controllers/creators_testimonials";

import {
  deleteCreatorGalleryImage,
  getCreatorGalleryImages,
  uploadCreatorGalleryImage,
} from "../controllers/creators_images";

import multer from "multer";

//functions to store images in memory until uploaded
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); //string should be name of input

const router = express.Router();

router.get("/creators/:id", getCreatorById);
router.patch("/creators/:id", updateCreator);

router.get("/creators/products/:creator_id", getProductsByCreatorId);
router.put("/creators/products/:creator_id", createProductForCreator);
router.patch("/creators/products/:id", updateProduct);
router.delete("/creators/products/:id", deleteProduct);

router.get("/creators/project_stages/:creator_id", getProjectStages);
router.put("/creators/project_stages/:creator_id", setProjectStages);

router.get("/creators/testimonials/:creator_id", getTestimonials);
router.put("/creators/testimonials/:creator_id", createTestimonial);

router.get("/creators/images/:creator_id", getCreatorGalleryImages);
router.put(
  "/creators/images/:creator_id",
  upload.single("image"),
  uploadCreatorGalleryImage
);
router.delete("/creators/images/:id", deleteCreatorGalleryImage);

export default router;
