import express from "express";
import { createAuth } from "../controllers/auth";

const router = express.Router();

router.put("/auth", createAuth);

// PUT	/auth
// PATCH	/auth/:auth_id
// POST	/auth/login
// POST	/auth/refresh

export default router;
