import React from "react";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";
import SectionHeading from "../components/SectionHeading";
const Settings = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar></Sidebar>
        <SectionHeading
          heading={"Settings"}
          actionButton={null}
        ></SectionHeading>
      </Box>
    </>
  );
};

export default Settings;
