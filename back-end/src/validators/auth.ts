import { body, param, validationResult } from "express-validator";

const validateRegistrationData = [
  body("email", "email is required").not().isEmpty(),
  body("email", "valid email is required").isEmail(),
  body("password", "password is invalid")
    .not()
    .isEmpty()
    .isLength({ min: 8, max: 50 }),
  body("given_name", "given name is required").not().isEmpty(),
  body("given_name", "maximum length of given name is 100 characters").isLength(
    { max: 100 }
  ),
  body("last_name", "last name is required").not().isEmpty(),
  body("last_name", "maximum length of last name is 100 characters").isLength({
    max: 100,
  }),
];

const validateLoginData = [
  body("email", "email is invalid").not().isEmpty().isEmail(),
  body("password", "password is required").not().isEmpty(),
];

const validateRefreshToken = [
  body("refresh", "refresh token is invalid").not().isEmpty(),
];

const validateUpdatePassword = [
  body("email", "email is required").not().isEmpty(),
  body("current_password", "current password is required").not().isEmpty(),
  body("new_password", "new password is required").not().isEmpty(),
  body(
    "new_password",
    "password should be minimum 8 characters, maximum 50 characters"
  ).isLength({ min: 8, max: 50 }),
];

export {
  validateRegistrationData,
  validateLoginData,
  validateRefreshToken,
  validateUpdatePassword,
};
