import express from "express";
import {
  createAuth,
  updatePassword,
  login,
  refresh,
} from "../controllers/auth";

const router = express.Router();

router.put("/auth", createAuth);
router.patch("/auth", updatePassword);
router.post("/auth/login", login);
router.post("/auth/refresh", refresh);

export default router;
