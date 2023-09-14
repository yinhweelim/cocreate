import React from "react";
import { Paper, IconButton, Stack, Typography } from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

interface ProjectStages {
  index?: number;
  name?: String;
  description?: String;
  time_estimate_unit?: String;
  time_estimate_start?: number;
  time_estimate_end?: number;
}

const ProjectStagesCard = (props: ProjectStages) => {
  return (
    <>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          completed {props.completedTime}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary" />
          <TimelineConnector sx={{ bgcolor: "primary.main" }} />
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="body1" color="primary">
            {props.name}
          </Typography>
          <Typography variant="subtitle1">{props.description}</Typography>
          <Typography variant="subtitle1" color="primary">
            {props.time_estimate_start} -{props.time_estimate_end}{" "}
            {props.time_estimate_unit}
          </Typography>
        </TimelineContent>
      </TimelineItem>
    </>
  );
};

export default ProjectStagesCard;
