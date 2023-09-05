import express from "express";
import { updateUser } from "../controllers/users";

const router = express.Router();

router.patch("/users/:user_id", updateUser);

export default router;
