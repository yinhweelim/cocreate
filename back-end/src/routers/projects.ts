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

import multer from "multer";

//functions to store images in memory until uploaded
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); //string should be name of input

const router = express.Router();

//briefs
router.get("/projects/briefs/creators/:creator_id", getBriefByCreatorId);
router.get("/projects/briefs/patrons/:patron_id", getBriefByPatronId);
router.put("/projects/briefs", createBrief);
router.patch("/projects/briefs/:id", updateBrief);

// //projects
router.get("/projects/creators/:creator_id", getProjectByCreatorId);
router.get("/projects/patrons/:patron_id", getProjectByPatronId);
router.put("/projects", createProject);
router.patch("/projects/:id", updateProject);

// // project stages
router.get("/projects/stages/:project_id", getProjectStagesByProject);
router.put("/projects/stages/:project_id", setProjectStages);

// //proposals
// router.get("/projects/proposals/:project_id", getProposalsByProjectId);
// router.put("/projects/proposals", createProjectProposal);
// router.patch("/projects/proposals/:id", updateProjectProposal);

export default router;
