import { Stack, Box, Button } from "@mui/material";
import React from "react";
import CreatorPageProjectStages from "../../components/CreatorPageProjectStages";
import ProjectStagesCard from "../../components/ProjectStagesCard";
import Timeline from "@mui/lab/Timeline";
import { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";
interface ProjectOverviewProps {
  isLoggedIn: boolean;
}
const ProjectOverviewSubpage = (props: ProjectOverviewProps) => {
  const updateStage = () => {
    console.log("update stage");
  };

  const shareTracker = () => {
    console.log("copy public URL");
  };

  return (
    <>
      <Stack direction="column" spacing={3}>
        {/* stages */}
        <Box paddingTop={2}>
          <Timeline
            sx={{
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.2,
              },
            }}
          >
            {props.stages?.map((data: any, index: number) => (
              // TODO: update styling. highlight current stage
              <ProjectStagesCard key={index} {...data} />
            ))}
          </Timeline>
        </Box>
        

        {/* Conditionally render based on page status */}
        {props.isLoggedIn ? (
          <>
            <Stack direction="row" spacing={2}>
              {props.currentUser.role === "CREATOR" ? (
                <Button variant="contained" onClick={updateStage}>
                  Update
                </Button>
              ) : (
                ""
              )}

              <Button variant="outlined" onClick={shareTracker}>
                Share
              </Button>
            </Stack>
          </>
        ) : (
          ""
        )}
      </Stack>
    </>
  );
};

export default ProjectOverviewSubpage;
