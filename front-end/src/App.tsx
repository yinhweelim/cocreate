import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { theme } from "./theme";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material";

import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignIn";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import InitialPageSetup from "./pages/InitialPageSetup";
import CreatorProjects from "./pages/creator-dashboard/CreatorProjects";
import CreatorPageConfig from "./pages/creator-dashboard/CreatorPageConfig";
import CreatorAnalytics from "./pages/creator-dashboard/CreatorAnalytics";
import PatronCommissions from "./pages/patron-dashboard/PatronCommissions";
import { SidebarProvider } from "./context/SidebarContext";

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <SidebarProvider>
          <CssBaseline />

          <Container maxWidth="lg">
            <Routes>
              <Route path="/" element={<LandingPage></LandingPage>}></Route>
              <Route
                path="/sign-in"
                element={<SignInPage></SignInPage>}
              ></Route>
              <Route
                path="/registration"
                element={<Registration></Registration>}
              ></Route>
              <Route
                path="/registration/page-setup"
                element={<InitialPageSetup></InitialPageSetup>}
              ></Route>
              <Route path="/home" element={<Home></Home>}></Route>
              <Route
                path="/projects"
                element={<CreatorProjects></CreatorProjects>}
              ></Route>
              <Route
                path="/pagesetup"
                element={<CreatorPageConfig></CreatorPageConfig>}
              ></Route>
              <Route
                path="/analytics"
                element={<CreatorAnalytics></CreatorAnalytics>}
              ></Route>
              <Route path="/settings" element={<Settings></Settings>}></Route>
              <Route
                path="/commissions"
                element={<PatronCommissions />}
              ></Route>
              {/* 
            <Route path="/creators/:creator_id" element={}></Route>
            <Route path="/creators/createbrief" element={}></Route>
            
 */}
            </Routes>
          </Container>
        </SidebarProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
