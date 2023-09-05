import express from "express";
import {
  getProductsByCreatorId,
  createProductForCreator,
} from "../controllers/products";

const router = express.Router();

router.get("/creators/products/:creator_id", getProductsByCreatorId);
router.put("/creators/products/:creator_id", createProductForCreator);

export default router;
