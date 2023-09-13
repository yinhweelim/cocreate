import { Stack, Box, Button } from "@mui/material";
import React from "react";
import CreatorProjectStagesCard from "../../components/CreatorProjectStagesCard";

const ProjectOverviewSubpage = (props: any) => {
  //   TODO: flesh out functions
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

        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={updateStage}>
            Update stage
          </Button>
          <Button variant="outlined" onClick={shareTracker}>
            Share with patron
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default ProjectOverviewSubpage;
