import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import useFetch from "../../hooks/useFetch";
import { data } from "../../interfaces";
import { AddAPhoto } from "@mui/icons-material";
import {
  Typography,
  Grid,
  Divider,
  Stack,
  Dialog,
  DialogTitle,
  Box,
  DialogContent,
  Card,
  CardMedia,
  CardContent,
  Button,
  TextField,
  DialogActions,
} from "@mui/material";
import ProjectBriefCard from "../../components/PatronBriefCard";
import SectionHeading from "../../components/SectionHeading";
import { useSnackbar } from "../../context/SnackbarContext";
import CreatorProductCard from "../../components/CreatorProductCard";
import CreatorProjectCard from "../../components/CreatorProjectCard";

interface Project {}

interface SubpageProps {
  projects: any;
  setProjects: React.Dispatch<React.SetStateAction<never[]>>;
}
const CreatorProjectsSubpage = (props: SubpageProps) => {
  const { showSnackbar } = useSnackbar();
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null); // selected project
  const [completedProjects, setCompletedProjects] = useState([]);
  const [pendingProjects, setPendingProjects] = useState([]);

  useEffect(() => {
    if (props.projects) {
      // Filter and set completed projects when props.projects change
      const completedProjects = props.projects.filter(
        (project: any) => project.is_completed
      );
      setCompletedProjects(completedProjects);

      const pendingProjects = props.projects.filter(
        (project: any) => !project.is_completed
      );
      setPendingProjects(pendingProjects);
    }
  }, [props.projects]);

  return (
    <>
      {/* page content */}
      <Grid container paddingY={4}>
        <Grid container flexDirection="column" rowSpacing={2}>
          <Stack paddingLeft={2} paddingBottom={4}>
            <Typography variant="overline" paddingY={1} fontSize="1rem">
              In progress
            </Typography>
            {props.projects?.length === 0 ? (
              <Typography variant="body1">
                No projects yet. Go out and get some!
              </Typography>
            ) : (
              <Grid container flexDirection={"row"} spacing={1}>
                {pendingProjects?.map((data: any, index: number) => (
                  <CreatorProjectCard
                    key={index}
                    {...data}
                    cardHeight="250"
                    onClick={() => {
                      console.log("clicked");
                    }}
                  />
                ))}
              </Grid>
            )}
          </Stack>

          <Divider />
          <Stack paddingLeft={2} paddingTop={2}>
            <Typography variant="overline" paddingY={1} fontSize="1rem">
              Completed
            </Typography>
            {/* display completed projects here */}
            {props.projects?.length === 0 ? (
              <Typography variant="body1">
                No projects yet. Go out and support some creators!
              </Typography>
            ) : (
              <Grid container flexDirection={"row"} spacing={1}>
                {completedProjects?.map((data: any, index: number) => (
                  <CreatorProjectCard
                    key={index}
                    {...data}
                    cardHeight="250"
                    onClick={() => {
                      console.log("clicked");
                    }}
                  />
                ))}
              </Grid>
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default CreatorProjectsSubpage;
