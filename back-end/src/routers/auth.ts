import express from "express";
import { register, updatePassword, login, refresh } from "../controllers/auth";

const router = express.Router();

router.put("/register", register);
router.patch("/auth", updatePassword);
router.post("/auth/login", login);
router.post("/auth/refresh", refresh);

export default router;
