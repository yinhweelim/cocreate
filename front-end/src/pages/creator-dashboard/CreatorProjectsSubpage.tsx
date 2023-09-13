import React, { useState, useContext } from "react";
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

interface Project {}

interface SubpageProps {
  isLoading: boolean;
  setProjects: React.Dispatch<React.SetStateAction<never[]>>;
}
const CreatorProjectsSubpage = (props: SubpageProps) => {
  const { showSnackbar } = useSnackbar();
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null); // selected brief for update
  const [selectedImage, setSelectedImage] = useState(null);

  if (props.isLoading) {
    return <Typography variant="body1">Loading...</Typography>;
  } else
    return (
      <>
        {/* page content */}
        <Grid container paddingY={4}>
          <Grid container flexDirection="column" rowSpacing={2}>
            <Stack paddingLeft={2} paddingBottom={4}>
              <Typography variant="overline" paddingY={1} fontSize="1rem">
                Current projects
              </Typography>
              {/* {props.briefs?.length == 0 ? (
                <Typography variant="body1">
                  No projects yet. Go out and get some!
                </Typography>
              ) : (
                ""
              )}{" "} */}
            </Stack>

            <Divider />
            <Stack paddingLeft={2} paddingTop={2}>
              <Typography variant="overline" paddingY={1} fontSize="1rem">
                Completed projects
              </Typography>

              {/* {projects.length == 0 ? (
                    <Typography variant="body1">
                      No projects yet. Go out and support some creators!
                    </Typography>
                  ) : (
                    ""
                  )} */}
            </Stack>
          </Grid>
        </Grid>
      </>
    );
};

export default CreatorProjectsSubpage;
