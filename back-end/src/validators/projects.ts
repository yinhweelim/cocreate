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
  body("name", "should be a string").optional().isString(),
];

const validateUpdateProjectData = [
  body("creator_id", "invalid creator_id").optional().isUUID(),
  body("patron_id", "invalid patron_id").optional().isUUID(),
  body("brief_id", "invalid brief_id").optional().isUUID(),
  body("agreed_proposal_id", "invalid proposal_id").optional().isUUID(),
  body("current_stage_id", "invalid stage_id").optional().isUUID(),
  body("is_deleted", "should be a boolean").optional().isBoolean(),
];

const validateSetProjectStagesData = [
  body().isArray().withMessage("Request body must be an array"),
  body("*").isObject().withMessage("Each item in the array must be an object"),
];
//TODO: figure out how to validate data inside the array of objects

const validateCreateProposalData = [
  body("project_id", "project_id is required").not().isEmpty(),
  body("project_id", "invalid project_id").isUUID(),
  body("currency", "currency is required").not().isEmpty(),
  body("currency", "invalid currency code")
    .isUppercase()
    .isLength({ min: 3, max: 3 }),
  body("total_price", "total_price is required").not().isEmpty(),
  body("total_price", "should be an integer").isInt(),

  body("project_fee", "should be an integer").optional().isInt(),
  body("delivery_fee", "should be an integer").optional().isInt(),
  body("additional_fee", "should be an integer").optional().isInt(),

  body("reference_image_url", "should be a string").optional().isString(),
  body("description", "should be a string").optional().isString(),
  body("is_deleted", "should be a boolean").optional().isBoolean(),
];

const validateUpdateProposalData = [
  body("project_id", "invalid project_id").optional().isUUID(),
  body("currency", "invalid currency code")
    .optional()
    .isUppercase()
    .isLength({ min: 3, max: 3 }),
  body("total_price", "should be an integer").optional().isInt(),
  body("project_fee", "should be an integer").optional().isInt(),
  body("delivery_fee", "should be an integer").optional().isInt(),
  body("additional_fee", "should be an integer").optional().isInt(),

  body("reference_image_url", "should be a string").optional().isString(),
  body("description", "should be a string").optional().isString(),
  body("is_accepted", "should be a boolean").optional().isBoolean(),
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
  validateSetProjectStagesData,
  validateCreateProposalData,
  validateUpdateProposalData,
};
