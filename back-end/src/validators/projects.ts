import { body, param, validationResult } from "express-validator";

const validateIdInParam = [
  param("id", "invalid id").isLength({ min: 36, max: 36 }),
];

const validateCreatorIdInParam = [
  param("creator_id", "invalid id").isLength({ min: 36, max: 36 }),
];

const validatePatronIdInParam = [
  param("patron_id", "invalid id").isLength({ min: 36, max: 36 }),
];

const validateProjectIdInParam = [
  param("project_id", "invalid id").isLength({ min: 36, max: 36 }),
];

const validateCreateBriefData = [
  body("creator_id", "creator_id is required").not().isEmpty(),
  body("product_id", "product_id is required").not().isEmpty(),
  body("patron_id", "patron_id is required").not().isEmpty(),
  body("creator_id", "invalid creator_id").isUUID(),
  body("product_id", "invalid product_id").isUUID(),
  body("patron_id", "invalid patron_id").isUUID(),
  body("details", "should be a string").optional().isString(),
  body("budget_currency", "invalid currency code")
    .optional()
    .isUppercase()
    .isLength({ min: 3, max: 3 }),
  body("budget_amount", "should be an integer").optional().isInt(),
  body("delivery_method", "invalid delivery method").optional().isUppercase(),
  body("is_deleted", "should be a boolean").optional().isBoolean(),
];

const validateUpdateBriefData = [
  body("creator_id", "invalid creator_id").optional().isUUID(),
  body("product_id", "invalid product_id").optional().isUUID(),
  body("patron_id", "invalid patron_id").optional().isUUID(),
  body("details", "should be a string").optional().isString(),
  body("budget_currency", "invalid currency code")
    .optional()
    .isUppercase()
    .isLength({ min: 3, max: 3 }),
  body("budget_amount", "should be an integer").optional().isNumeric(),
  body("delivery_method", "invalid delivery method").optional().isUppercase(),
  body("status", "invalid status").optional().isUppercase(),
  body("is_deleted", "should be a boolean").optional().isBoolean(),
];

const validateCreateProjectData = [
  body("creator_id", "creator_id is required").not().isEmpty(),
  body("patron_id", "patron_id is required").not().isEmpty(),
  body("brief_id", "brief_id is required").not().isEmpty(),
  body("creator_id", "invalid creator_id").isUUID(),
  body("patron_id", "invalid patron_id").isUUID(),
  body("brief_id", "invalid brief_id").isUUID(),
  body("agreed_proposal_id", "invalid proposal_id").optional().isUUID(),
  body("current_stage_id", "invalid stage_id").optional().isUUID(),
  body("is_deleted", "should be a boolean").optional().isBoolean(),
];

const validateUpdateProjectData = [
  body("creator_id", "invalid creator_id").optional().isUUID(),
  body("patron_id", "invalid patron_id").optional().isUUID(),
  body("brief_id", "invalid brief_id").optional().isUUID(),
  body("agreed_proposal_id", "invalid proposal_id").optional().isUUID(),
  body("current_stage_id", "invalid stage_id").optional().isUUID(),
  body("is_deleted", "should be a boolean").optional().isBoolean(),
];

export {
  validateIdInParam,
  validateCreatorIdInParam,
  validatePatronIdInParam,
  validateProjectIdInParam,
  validateCreateBriefData,
  validateUpdateBriefData,
  validateCreateProjectData,
  validateUpdateProjectData,
};
