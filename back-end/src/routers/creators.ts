import express from "express";
import { getCreatorById, updateCreator } from "../controllers/creators";

const router = express.Router();

router.get("/creators/:id", getCreatorById);
router.patch("/creators/:id", updateCreator);

export default router;
