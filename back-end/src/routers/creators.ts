import express from "express";
import {
  getCreatorById,
  updateCreator,
  updateCreatorLogo,
} from "../controllers/creators";
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
  getCreatorPortfolioItem,
  uploadCreatorPortfolioItem,
  deleteCreatorPortfolioItem,
} from "../controllers/creators_portfolio_item";
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
  validateCreatorIdInParam,
  validateUpdateCreatorData,
  validateCreateProductData,
  validateUpdateProductData,
  validateSetProjectStagesData,
  validateCreateTestimonialData,
  validateUpdateSocialLinkData,
  validateCreateSocialLinkData,
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
router.patch(
  "/creators/logos/:creator_id",
  upload.single("image"),
  updateCreatorLogo
);

//products
router.get(
  "/creators/products/:creator_id",
  validateCreatorIdInParam,
  checkValid,
  getProductsByCreatorId
);
router.put(
  "/creators/products/:creator_id",
  validateCreatorIdInParam,
  validateCreateProductData,
  checkValid,
  upload.single("image"),
  createProductForCreator
);
router.patch(
  "/creators/products/:id",
  validateIdInParam,
  validateUpdateProductData,
  checkValid,
  updateProduct
);
router.delete(
  "/creators/products/:id",
  validateIdInParam,
  checkValid,
  deleteProduct
);

//template project stages
router.get(
  "/creators/project_stages/:creator_id",
  validateCreatorIdInParam,
  checkValid,
  getProjectStages
);
router.put(
  "/creators/project_stages/:creator_id",
  validateCreatorIdInParam,
  validateSetProjectStagesData,
  checkValid,
  setProjectStages
);

//testimonials
router.get(
  "/creators/testimonials/:creator_id",
  validateCreatorIdInParam,
  checkValid,
  getTestimonials
);
router.put(
  "/creators/testimonials/:creator_id",
  validateCreatorIdInParam,
  validateCreateTestimonialData,
  checkValid,
  createTestimonial
);

//gallery images
router.get(
  "/creators/portfolio/:creator_id",
  validateCreatorIdInParam,
  checkValid,
  getCreatorPortfolioItem
);
router.put(
  "/creators/portfolio/:creator_id",
  validateCreatorIdInParam,
  checkValid,
  upload.single("image"),
  uploadCreatorPortfolioItem
);
router.delete(
  "/creators/portfolio/:id",
  validateIdInParam,
  checkValid,
  deleteCreatorPortfolioItem
);

//social links
router.get(
  "/creators/sociallinks/:creator_id",
  validateCreatorIdInParam,
  checkValid,
  getSocialLinksByCreatorId
);
router.put(
  "/creators/sociallinks/:creator_id",
  validateCreatorIdInParam,
  validateCreateSocialLinkData,
  checkValid,
  createSocialLink
);
router.patch(
  "/creators/sociallinks/:id",
  validateIdInParam,
  validateUpdateSocialLinkData,
  checkValid,
  updateSocialLink
);
router.delete(
  "/creators/sociallinks/:id",
  validateIdInParam,
  checkValid,
  deleteSocialLink
);

export default router;
