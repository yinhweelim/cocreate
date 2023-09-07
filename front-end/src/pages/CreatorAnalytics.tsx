import React from "react";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";
import SectionHeading from "../components/SectionHeading";

const CreatorAnalytics = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar></Sidebar>
        <SectionHeading
          heading={"Analytics"}
          actionButton={null}
        ></SectionHeading>
      </Box>
    </>
  );
};

export default CreatorAnalytics;
