import React, { useState } from "react";
import { Box, Grid, Button, Divider, Stack } from "@mui/material";
import SectionHeading from "../../components/SectionHeading";
import CreatorProjectsSubpage from "./CreatorProjectsSubpage";
import CreatorRequestsSubpage from "./CreatorRequestsSubpage";

const CreatorProjects = () => {
  const [selectedSubpage, setSelectedSubpage] = useState<String>("projects");

  const handleSubpageChange = (subpage: String) => {
    setSelectedSubpage(subpage);
  };

  return (
    <>
      <Grid container direction="column">
        {/* header with action buttons */}
        <SectionHeading
          heading={"Projects"}
          actionButton={<Button variant="contained">Create Project</Button>}
        ></SectionHeading>

        {/* subpages */}
        <Stack direction={"row"} spacing={1}>
          <Button
            variant="text"
            onClick={() => handleSubpageChange("projects")}
          >
            Projects
          </Button>
          <Button
            variant="text"
            onClick={() => handleSubpageChange("requests")}
          >
            Requests
          </Button>
        </Stack>

        <Divider />

        {/* page content */}
        <Grid container padding={1}>
          {selectedSubpage === "projects" ? (
            <CreatorProjectsSubpage />
          ) : (
            <CreatorRequestsSubpage />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default CreatorProjects;
