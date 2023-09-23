import React, { useState, useEffect } from "react";
import { Project } from "../../interfaces";
import { Typography, Grid, Divider, Stack } from "@mui/material";
import CreatorProjectCard from "../../components/CreatorProjectCard";
import { useNavigate } from "react-router-dom";

interface SubpageProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const CreatorProjectsSubpage = (props: SubpageProps) => {
  const [completedProjects, setCompletedProjects] = useState<Project[] | null>(
    []
  );
  const [pendingProjects, setPendingProjects] = useState<Project[] | null>([]);
  const navigate = useNavigate();

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
                      navigate("/dashboard/projects/" + data.id);
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
            {/* display completed projects */}
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
                      navigate("/dashboard/projects/" + data.id);
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
