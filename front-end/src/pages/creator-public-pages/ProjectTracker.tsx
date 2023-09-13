import React from "react";
import { useParams } from "react-router-dom";
const ProjectTracker = () => {
  const params = useParams();
  const projectId = params.project_id;
  return <div>Project tracker for project: {projectId}</div>;
};

export default ProjectTracker;
