import express from "express";
import {
  getBriefByCreatorId,
  getBriefByPatronId,
  createBrief,
  updateBrief,
  updateBriefImage,
} from "../controllers/project_briefs";
import {
  getProjectByCreatorId,
  getProjectByPatronId,
  getProjectById,
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
  validateUpdateBriefData,
  validateCreateProjectData,
  validateUpdateProjectData,
  validateSetProjectStagesData,
  validateCreateProposalData,
  validateUpdateProposalData,
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
  auth,
  checkValid,
  getBriefByCreatorId
);
router.get(
  "/projects/briefs/patrons/:patron_id",
  validatePatronIdInParam,
  auth,
  checkValid,
  getBriefByPatronId
);
router.put("/projects/briefs", auth, upload.single("image"), createBrief);
router.patch(
  "/projects/briefs/:id",
  auth,
  validateUpdateBriefData,
  validateIdInParam,
  checkValid,
  updateBrief
);
router.patch(
  "/projects/briefs/images/:id",
  auth,
  upload.single("image"),
  updateBriefImage
);

//projects
router.get("/projects/:id", validateIdInParam, checkValid, getProjectById);
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
router.put("/projects", validateCreateProjectData, checkValid, createProject);
router.patch(
  "/projects/:id",
  validateIdInParam,
  validateUpdateProjectData,
  checkValid,
  updateProject
);

// project stages
router.get(
  "/projects/stages/:project_id",
  validateProjectIdInParam,
  checkValid,
  getProjectStagesByProject
);
router.put(
  "/projects/stages/:project_id",
  validateProjectIdInParam,
  validateSetProjectStagesData,
  checkValid,
  setProjectStages
);

//proposals
router.get(
  "/projects/proposals/:project_id",
  validateProjectIdInParam,
  checkValid,
  getProposalsByProjectId
);
router.put(
  "/projects/proposals",
  validateCreateProposalData,
  checkValid,
  createProjectProposal
);
router.patch(
  "/projects/proposals/:id",
  validateIdInParam,
  validateUpdateProposalData,
  checkValid,
  updateProjectProposal
);

export default router;
