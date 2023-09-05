import express from "express";
import { createAuth, updatePassword } from "../controllers/auth";

const router = express.Router();

router.put("/auth", createAuth);
router.patch("/auth", updatePassword);

// POST	/auth/login
// POST	/auth/refresh

export default router;
