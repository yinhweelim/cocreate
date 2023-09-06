import { body, param, validationResult } from "express-validator";

const validateIdInParam = [
  param("id", "invalid id").isLength({ min: 36, max: 36 }),
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

export { validateIdInParam, validateUpdateCreatorData };
