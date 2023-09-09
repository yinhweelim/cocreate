import express from "express";
import {
  updateUser,
  updateUserAvatar,
  getUsersByAuthId,
} from "../controllers/users";
import { auth } from "../middleware/auth";
import { validation as checkValid } from "../middleware/checkValid";
import {
  validateIdInParam,
  validateAuthIdInParam,
  validateUpdateUserData,
} from "../validators/users";

const router = express.Router();

const multer = require("multer"); //middleware to read image data
//functions to store images in memory until uploaded
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); //string should be name of input

router.get(
  "/users/:auth_id",
  validateAuthIdInParam,
  checkValid,
  getUsersByAuthId
);
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
  upload.single("image"),
  updateUserAvatar
);

export default router;
