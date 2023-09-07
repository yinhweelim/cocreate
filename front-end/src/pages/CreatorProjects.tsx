import React from "react";
import Sidebar from "../components/Sidebar";
import { Box, Button, Divider } from "@mui/material";
import SectionHeading from "../components/SectionHeading";
const CreatorProjects = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar></Sidebar>
        <SectionHeading
          heading={"Projects"}
          actionButton={<Button variant="contained">Create</Button>}
        ></SectionHeading>
        <Divider variant="middle" />
      </Box>
    </>
  );
};

export default CreatorProjects;
