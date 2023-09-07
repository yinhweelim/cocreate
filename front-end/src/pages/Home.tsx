import React from "react";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";
import SectionHeading from "../components/SectionHeading";

const Home = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar></Sidebar>
      </Box>
    </>
  );
};

export default Home;
