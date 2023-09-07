import React from "react";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";
import SectionHeading from "../components/SectionHeading";

const CreatorPageConfig = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar></Sidebar>
        <SectionHeading heading={"My Page"} actionButton={null} />
      </Box>
    </>
  );
};

export default CreatorPageConfig;
