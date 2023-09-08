import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Box, Grid, Button, Stack, Divider } from "@mui/material";
import SectionHeading from "../../components/SectionHeading";
import CreatorProfileSubpage from "./CreatorProfileSubpage";
import CreatorProjectConfig from "./CreatorProjectConfigSubpage";

const CreatorPageConfig = () => {
  const [selectedSubpage, setSelectedSubpage] =
    useState<String>("business_profile");

  const handleSubpageChange = (subpage: String) => {
    setSelectedSubpage(subpage);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar></Sidebar>

        <Grid container direction="column">
          {/* header with action buttons */}
          <SectionHeading
            heading={"My page"}
            actionButton={<Button variant="contained">View Page</Button>}
          ></SectionHeading>

          {/* subpages */}
          <Stack direction={"row"} spacing={1}>
            <Button
              variant="text"
              onClick={() => handleSubpageChange("business_profile")}
            >
              Business Profile
            </Button>
            <Button
              variant="text"
              onClick={() => handleSubpageChange("project_settings")}
            >
              Project Settings
            </Button>
          </Stack>

          <Divider />

          {/* page content */}

          {selectedSubpage === "business_profile" ? (
            <CreatorProfileSubpage />
          ) : (
            <CreatorProjectConfig />
          )}
        </Grid>
      </Box>
    </>
  );
};

export default CreatorPageConfig;
