import express from "express";
import {
  getBriefByCreatorId,
  getBriefByPatronId,
  createBrief,
  updateBrief,
} from "../controllers/project_briefs";
import {
  getProjectByCreatorId,
  getProjectByPatronId,
  createProject,
  updateProject,
} from "../controllers/projects";
import {
  getProjectStagesByProject,
  setProjectStages,
} from "../controllers/project_stages";
import {
  getProposalsByProjectId,
  createProjectProposal,
  updateProjectProposal,
} from "../controllers/project_proposals";
import {
  validateIdInParam,
  validateCreatorIdInParam,
  validatePatronIdInParam,
  validateProjectIdInParam,
  validateCreateBriefData,
  validateUpdateBriefData,
} from "../validators/projects";
import { auth } from "../middleware/auth";
import { validation as checkValid } from "../middleware/checkValid";

import multer from "multer";

//functions to store images in memory until uploaded
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); //string should be name of input

const router = express.Router();

//briefs
router.get(
  "/projects/briefs/creators/:creator_id",
  validateCreatorIdInParam,
  checkValid,
  getBriefByCreatorId
);
router.get(
  "/projects/briefs/patrons/:patron_id",
  validatePatronIdInParam,
  checkValid,
  getBriefByPatronId
);
router.put(
  "/projects/briefs",
  validateCreateBriefData,
  checkValid,
  createBrief
);
router.patch(
  "/projects/briefs/:id",
  validateUpdateBriefData,
  validateIdInParam,
  checkValid,
  updateBrief
);

// //projects
router.get(
  "/projects/creators/:creator_id",
  validateCreatorIdInParam,
  checkValid,
  getProjectByCreatorId
);
router.get(
  "/projects/patrons/:patron_id",
  validatePatronIdInParam,
  checkValid,
  getProjectByPatronId
);
router.put("/projects", createProject);
router.patch("/projects/:id", validateIdInParam, checkValid, updateProject);

// // project stages
router.get(
  "/projects/stages/:project_id",
  validateProjectIdInParam,
  checkValid,
  getProjectStagesByProject
);
router.put(
  "/projects/stages/:project_id",
  validateProjectIdInParam,
  checkValid,
  setProjectStages
);

// //proposals
router.get(
  "/projects/proposals/:project_id",
  validateProjectIdInParam,
  checkValid,
  getProposalsByProjectId
);
router.put("/projects/proposals", createProjectProposal);
router.patch(
  "/projects/proposals/:id",
  validateIdInParam,
  checkValid,
  updateProjectProposal
);

export default router;
