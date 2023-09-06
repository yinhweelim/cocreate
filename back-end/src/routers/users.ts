import express from "express";
import { updateUser, updateUserAvatar } from "../controllers/users";
import { auth } from "../middleware/auth";
import { validation as checkValid } from "../middleware/checkValid";

const router = express.Router();

router.patch("/users/:id", updateUser);
router.patch("/users/avatars/:user_id", updateUserAvatar);

export default router;
