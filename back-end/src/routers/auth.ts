import express from "express";
import { register, updatePassword, login, refresh } from "../controllers/auth";
import { auth } from "../middleware/auth";
import { validation as checkValid } from "../middleware/checkValid";
import {
  validateRegistrationData,
  validateLoginData,
  validateRefreshToken,
  validateUpdatePassword,
} from "../validators/auth";

const router = express.Router();

router.put("/register", validateRegistrationData, checkValid, register);
router.patch("/auth", validateUpdatePassword, checkValid, updatePassword);
router.post("/auth/login", validateLoginData, checkValid, login);
router.post("/auth/refresh", validateRefreshToken, checkValid, refresh);

export default router;
