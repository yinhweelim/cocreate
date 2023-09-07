import React from "react";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";

const Settings = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar></Sidebar>
        <Box>Settings</Box>
      </Box>
    </>
  );
};

export default Settings;
