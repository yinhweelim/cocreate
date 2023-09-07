import React from "react";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";
const Home = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar></Sidebar>
        <Box>Projects</Box>
      </Box>
    </>
  );
};

export default Home;