import React from "react";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";

const CreatorPageConfig = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar></Sidebar>
        <Box>My page</Box>
      </Box>
    </>
  );
};

export default CreatorPageConfig;
