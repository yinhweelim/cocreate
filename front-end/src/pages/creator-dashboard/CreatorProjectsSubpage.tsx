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
import ProjectBriefCard from "../../components/ProjectBriefCard";
import SectionHeading from "../../components/SectionHeading";
import { useSnackbar } from "../../context/SnackbarContext";

interface SubpageProps {
  isLoading: boolean;
  setProjects: React.Dispatch<React.SetStateAction<never[]>>;
}
const CreatorProjectsSubpage = (props: SubpageProps) => {
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
              {/* 
              {props.projects.length == 0 ? (
                <Typography variant="body1">
                  No projects yet. Go out and get some creators!
                </Typography>
              ) : (
                ""
              )} */}
              <Grid container flexDirection={"row"} spacing={1}>
                {/* add project cards here */}
                {/* {briefs?.map((data: any, index: number) => (
                    <ProjectBriefCard
                      key={index}
                      {...data}
                      cardHeight="250"
                      onClick={() => {
                        setSelectedBrief(data);
                        setOpenUpdateBrief(true);
                      }}
                    />
                  ))} */}
              </Grid>
            </Stack>

            <Divider />
            <Stack paddingLeft={2} paddingTop={2}>
              <Typography variant="overline" paddingY={1} fontSize="1rem">
                Completed projects
              </Typography>

              <Grid container flexDirection={"row"} spacing={1}>
                {/* {projects.length == 0 ? (
                    <Typography variant="body1">
                      No projects yet. Go out and support some creators!
                    </Typography>
                  ) : (
                    ""
                  )} */}
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </>
    );
};

export default CreatorProjectsSubpage;
