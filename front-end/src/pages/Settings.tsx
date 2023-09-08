import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Box, Grid, Button, Divider, Stack } from "@mui/material";
import SectionHeading from "../components/SectionHeading";
const Settings = () => {
  const [selectedSubpage, setSelectedSubpage] = useState<String>("subpage1");

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
            heading={"Settings"}
            actionButton={null}
          ></SectionHeading>

          {/* subpages */}
          <Stack direction={"row"} spacing={1}>
            <Button
              variant="text"
              onClick={() => handleSubpageChange("subpage1")}
            >
              subpage1
            </Button>
            <Button
              variant="text"
              onClick={() => handleSubpageChange("subpage2")}
            >
              subpage2
            </Button>
          </Stack>

          <Divider />

          {/* page content */}
          <Grid container padding={1}>
            PAGE CONTENT
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Settings;
