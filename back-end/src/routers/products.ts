import express from "express";
import {
  getProductsByCreatorId,
  createProductForCreator,
  updateProduct,
  deleteProduct,
} from "../controllers/products";

const router = express.Router();

router.get("/creators/products/:creator_id", getProductsByCreatorId);
router.put("/creators/products/:creator_id", createProductForCreator);
router.patch("/creators/products/:id", updateProduct);
router.delete("/creators/products/:id", deleteProduct);

export default router;
