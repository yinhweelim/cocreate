import express from "express";
import { getCreatorById, updateCreator } from "../controllers/creators";
import {
  getProductsByCreatorId,
  createProductForCreator,
  updateProduct,
  deleteProduct,
} from "../controllers/products";
import {
  getProjectStages,
  setProjectStages,
} from "../controllers/creators_project_stages";

const router = express.Router();

router.get("/creators/:id", getCreatorById);
router.patch("/creators/:id", updateCreator);

router.get("/creators/products/:creator_id", getProductsByCreatorId);
router.put("/creators/products/:creator_id", createProductForCreator);
router.patch("/creators/products/:id", updateProduct);
router.delete("/creators/products/:id", deleteProduct);

router.get("/creators/project_stages/:creator_id", getProjectStages);
router.put("/creators/project_stages/:creator_id", setProjectStages);

export default router;
