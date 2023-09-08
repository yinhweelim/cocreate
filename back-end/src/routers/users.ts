import express from "express";
import {
  updateUser,
  updateUserAvatar,
  getUsersByAuthId,
} from "../controllers/users";
import { auth } from "../middleware/auth";
import { validation as checkValid } from "../middleware/checkValid";
import { validateIdInParam, validateUpdateUserData } from "../validators/users";

const router = express.Router();

router.get("/users/:auth_id", getUsersByAuthId);
router.patch(
  "/users/:id",
  validateIdInParam,
  validateUpdateUserData,
  checkValid,
  updateUser
);
router.patch(
  "/users/avatars/:user_id",
  validateIdInParam,
  checkValid,
  updateUserAvatar
);

export default router;
