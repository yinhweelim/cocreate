import { Typography } from "@mui/material";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { format } from "date-fns";
interface ProjectStages {
  index?: number;
  name?: string;
  description?: string;
  time_estimate_unit?: string;
  time_estimate_start?: number;
  time_estimate_end?: number;
  isCurrentStage?: boolean;
  is_completed?: boolean;
  completed_time?: string;
}

const ProjectStagesCard = (props: ProjectStages) => {
  return (
    <>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          {/* conditionally show completed time if is_completed prop = true */}
          {props.is_completed &&
            props.completed_time &&
            format(new Date(props.completed_time), "yyyy-MM-dd HH:mm")}
        </TimelineOppositeContent>
        <TimelineSeparator>
          {/* Conditionally set the color based on isCurrentStage prop */}
          <TimelineDot color={props.is_completed ? "primary" : "grey"} />
          {props.index === 6 ? null : (
            <TimelineConnector
              sx={{
                bgcolor: props.is_completed ? "primary.main" : "grey",
              }}
            />
          )}
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
