import {
  Stack,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import CreatorPageProjectStages from "../../components/CreatorPageProjectStages";
import ProjectStagesCard from "../../components/ProjectStagesCard";
import Timeline from "@mui/lab/Timeline";
import { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";

interface ProjectOverviewProps {
  isLoggedIn: boolean;
  currentStageId: string;
  stages: any[];
}
const ProjectOverviewSubpage = (props: ProjectOverviewProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);

  const toggleStageSelection = (stageId: string) => {
    setSelectedStages((prevSelectedStages) => {
      if (prevSelectedStages.includes(stageId)) {
        return prevSelectedStages.filter((id) => id !== stageId);
      } else {
        return [...prevSelectedStages, stageId];
      }
    });
  };

  const updateProgress = () => {
    // Call your updateProgress function with the selected stages
    console.log("Updating progress for stages:", selectedStages);
    // Close the dialog
    setOpenDialog(false);
  };

  const shareTracker = () => {
    console.log("Copy public URL");
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
              <ProjectStagesCard
                key={index}
                isCurrentStage={data.id === props.currentStageId}
                {...data}
              />
            ))}
          </Timeline>
        </Box>

        {/* Conditionally render based on page status */}
        {props.isLoggedIn && (
          <Stack direction="row" spacing={2}>
            {props.currentUser.role === "CREATOR" && (
              <Button variant="contained" onClick={() => setOpenDialog(true)}>
                Update
              </Button>
            )}

            <Button variant="outlined" onClick={shareTracker}>
              Share
            </Button>
          </Stack>
        )}
      </Stack>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Update Progress</DialogTitle>
        <DialogContent>
          {props.stages.map((data: any) => (
            <div key={data.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      data.is_completed || selectedStages.includes(data.id)
                    }
                    onChange={() => toggleStageSelection(data.id)}
                    disabled={data.is_completed}
                  />
                }
                label={data.name}
              />
              {data.is_completed && <div>Completed: {data.completed_time}</div>}
            </div>
          ))}

          <Divider></Divider>

          <FormControlLabel
            control={
              <Checkbox
                checked={selectedStages.length === props.stages.length}
                onChange={() =>
                  setSelectedStages(
                    selectedStages.length === props.stages.length
                      ? []
                      : props.stages.map((data: any) => data.id)
                  )
                }
              />
            }
            label="Mark project complete"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={updateProgress} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProjectOverviewSubpage;
