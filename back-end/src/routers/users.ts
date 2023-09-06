import express from "express";
import { updateUser, updateUserAvatar } from "../controllers/users";

const router = express.Router();

router.patch("/users/:id", updateUser);
router.patch("/users/avatars/:user_id", updateUserAvatar);

export default router;
