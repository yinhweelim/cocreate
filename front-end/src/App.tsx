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

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<LandingPage></LandingPage>}></Route>
            <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
            <Route
              path="/registration"
              element={<Registration></Registration>}
            ></Route>
            {/* 
            <Route path="/registration/page-setup" element={}></Route>
            <Route path="/creators/:creator_id" element={}></Route>
            <Route path="/creators/createbrief" element={}></Route>
            <Route path="/home" element={}></Route>
            <Route path="/projects" element={}></Route>
            <Route path="/mypage" element={}></Route>
            <Route path="/insights" element={}></Route>
            <Route path="/settings" element={}></Route> */}
          </Routes>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
