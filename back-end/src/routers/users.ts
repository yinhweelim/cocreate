import express from "express";
import { updateUser, updateUserAvatar } from "../controllers/users";
import { auth } from "../middleware/auth";
import { validation as checkValid } from "../middleware/checkValid";
import { validateIdInParam, validateUpdateUserData } from "../validators/users";

const router = express.Router();

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
