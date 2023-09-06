import { body, param, validationResult } from "express-validator";

const validateIdInParam = [
  param("id", "invalid id").isLength({ min: 36, max: 36 }),
];

const validateUpdateUserData = [
  body("country_of_residence", "max length is 100 characters")
    .optional()
    .isLength({ max: 100 }),
  body("avatar_image_url", "should be a string").optional().isString(),
  body("given_name", "maximum length is 100 characters")
    .optional()
    .isLength({ max: 100 }),
  body("last_name", "maximum length is 100 characters").optional().isLength({
    max: 100,
  }),
  body("is_deleted", "type should be boolean").optional().isBoolean(),
];

export { validateIdInParam, validateUpdateUserData };
