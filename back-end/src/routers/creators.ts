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
import {
  getSocialLinksByCreatorId,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from "../controllers/creators_social_links";
import multer from "multer";
import { auth } from "../middleware/auth";
import { validation as checkValid } from "../middleware/checkValid";
import {
  validateIdInParam,
  validateUpdateCreatorData,
} from "../validators/creators";

//functions to store images in memory until uploaded
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); //string should be name of input

const router = express.Router();

//creators
router.get("/creators/:id", validateIdInParam, checkValid, getCreatorById);
router.patch(
  "/creators/:id",
  validateIdInParam,
  validateUpdateCreatorData,
  checkValid,
  updateCreator
);

//products
router.get("/creators/products/:creator_id", getProductsByCreatorId);
router.put("/creators/products/:creator_id", createProductForCreator);
router.patch("/creators/products/:id", updateProduct);
router.delete("/creators/products/:id", deleteProduct);

//template project stages
router.get("/creators/project_stages/:creator_id", getProjectStages);
router.put("/creators/project_stages/:creator_id", setProjectStages);

//testimonials
router.get("/creators/testimonials/:creator_id", getTestimonials);
router.put("/creators/testimonials/:creator_id", createTestimonial);

//gallery images
router.get("/creators/images/:creator_id", getCreatorGalleryImages);
router.put(
  "/creators/images/:creator_id",
  upload.single("image"),
  uploadCreatorGalleryImage
);
router.delete("/creators/images/:id", deleteCreatorGalleryImage);

//social links
router.get("/creators/sociallinks/:creator_id", getSocialLinksByCreatorId);
router.put("/creators/sociallinks/:creator_id", createSocialLink);
router.patch("/creators/sociallinks/:id", updateSocialLink);
router.delete("/creators/sociallinks/:id", deleteSocialLink);

export default router;
