import { body, param, validationResult } from "express-validator";

const validateIdInParam = [
  param("id", "invalid id").isLength({ min: 36, max: 36 }),
];

const validateCreatorIdInParam = [
  param("creator_id", "invalid id").isLength({ min: 36, max: 36 }),
];

const validateUpdateCreatorData = [
  body("display_name", "max length is 100 characters")
    .optional()
    .isLength({ max: 100 }),
  body("tagline", "max length is 100 characters")
    .optional()
    .isLength({ max: 100 }),
  body("country_of_operation", "max length is 80 characters")
    .optional()
    .isLength({ max: 80 }),
  body("about", "should be a string").optional().isString(),
  body("logo_image_url", "should be a string").optional().isString(),
  body("project_description_guideline", "should be a string")
    .optional()
    .isString(),
  body("payment_instructions", "should be a string").optional().isString(),
  body("slots_per_month", "should be an integer").optional().isInt(),
  body("consultation_notice_days", "should be an integer").optional().isInt(),
  body("lead_time_in_weeks", "should be an integer").optional().isInt(),
  body("display_slots_per_month", "should be boolean type")
    .optional()
    .isBoolean(),
  body("display_project_count", "should be boolean type")
    .optional()
    .isBoolean(),
  body("allow_consultation_booking", "should be boolean type")
    .optional()
    .isBoolean(),
  body("is_deleted", "should be boolean type").optional().isBoolean(),
];

const validateCreateProductData = [
  body("image_url", "image_url is required").not().isEmpty(),
  body("title", "title is required").not().isEmpty(),
  body("description", "description is required").not().isEmpty(),
  body("currency", "currency is required").not().isEmpty(),
  body("starting_price", "starting_price is required").not().isEmpty(),
  body("currency", "invalid currency code").isLength({ max: 3 }),
  body("starting_price", "should be an integer").isInt(),
  body("image_url", "should be a string").isString(),
  body("title", "maximum length is 100 characters")
    .isString()
    .isLength({ max: 100 }),
  body("description", "should be a string").isString(),
  body("currency", "invalid currency code").isLength({ max: 3 }),
  body("starting_price", "should be an integer").isInt(),
  body("is_deleted", "should be a boolean").optional().isBoolean(),
];

const validateUpdateProductData = [
  body("image_url", "should be a string").optional().isString(),
  body("title", "maximum length is 100 characters")
    .optional()
    .isString()
    .isLength({ max: 100 }),
  body("description", "should be a string").optional().isString(),
  body("currency", "invalid currency code").optional().isLength({ max: 3 }),
  body("starting_price", "should be an integer").optional().isInt(),
  body("is_deleted", "should be a boolean").optional().isBoolean(),
];

export {
  validateIdInParam,
  validateCreatorIdInParam,
  validateUpdateCreatorData,
  validateCreateProductData,
  validateUpdateProductData,
};
