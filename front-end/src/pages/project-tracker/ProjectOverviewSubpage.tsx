import { Stack, Box, Button } from "@mui/material";
import React from "react";
import CreatorProjectStagesCard from "../../components/CreatorProjectStagesCard";

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
          {props.stages?.map((data: any, index: number) => (
            // TODO: update styling. highlight current stage
            <CreatorProjectStagesCard key={index} {...data} cardHeight="250" />
          ))}
        </Box>

        {/* Conditionally render based on page status */}
        {props.isLoggedIn ? (
          <>
            <Stack direction="row" spacing={2}>
              {props.currentUser.role === "CREATOR" ? (
                <Button variant="contained" onClick={updateStage}>
                  Update stage
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
