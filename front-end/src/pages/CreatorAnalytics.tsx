import React from "react";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";

const CreatorAnalytics = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar></Sidebar>
        <Box>Analytics</Box>
      </Box>
    </>
  );
};

export default CreatorAnalytics;
