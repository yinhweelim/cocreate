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
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import ProjectStagesCard from "../../components/ProjectStagesCard";
import Timeline from "@mui/lab/Timeline";
import { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";
import { format } from "date-fns";
import UserContext from "../../context/UserContext";
import { data } from "../../interfaces";
import useFetch from "../../hooks/useFetch";
import { useSnackbar } from "../../context/SnackbarContext";

interface ProjectOverviewProps {
  isLoggedIn: boolean;
  stages: any[];
  projectId: string;
  getProjectData: () => Promise<void>;
}
const ProjectOverviewSubpage = (props: ProjectOverviewProps) => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const { showSnackbar } = useSnackbar();

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

  const updateProject = async (updatedStages: any) => {
    const currentStage = updatedStages.reduce((current, stage) => {
      if (stage.is_completed && (!current || stage.index > current.index)) {
        return stage;
      }
      return current;
    }, null);

    // Extract the current stage's ID
    const current_stage_id = currentStage.id;

    const res: data = await fetchData(
      "/api/projects/" + props.projectId,
      "PATCH",
      {
        current_stage_id,
      },
      userCtx?.accessToken
    );
    if (res.ok) {
      showSnackbar("Project updated successfully", "success");
      props.getProjectData();
    } else {
      showSnackbar("Project update failed", "warning");
    }
  };

  const updateProgress = async () => {
    const updatedStages = [];

    //update all selected stages
    for (const stage of props.stages) {
      if (selectedStages.includes(stage.id)) {
        // Check if the stage ID is in the selectedStages array
        stage.is_completed = true;
        stage.completed_time = new Date().toISOString();
      }
      updatedStages.push(stage);
    }

    // Update current_stage_id in project
    updateProject(updatedStages);

    // Update the completed status and time in each stage
    const res: data = await fetchData(
      "/api/projects/stages/" + props.projectId,
      "PUT",
      updatedStages,
      userCtx?.accessToken
    );

    if (res.ok) {
      showSnackbar("Project updated successfully", "success");
      props.getProjectData();
    } else {
      showSnackbar("Project update failed", "warning");
    }

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
              <ProjectStagesCard key={index} {...data} />
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
          {JSON.stringify(props.stages)}
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
              {data.is_completed && (
                <Typography variant="subtitle2" paddingLeft={4} color="primary">
                  Completed:{" "}
                  {format(new Date(data.completed_time), "yyyy-MM-dd HH:mm")}
                </Typography>
              )}
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
            label="Mark entire project complete"
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
