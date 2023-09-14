import { useState, useEffect } from "react";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import UserContext from "./context/UserContext";
import useFetch from "./hooks/useFetch";
import "./App.css";
import { data } from "../src/interfaces";

//MUI and theme
import CssBaseline from "@mui/material/CssBaseline";
import { Snackbar, Stack, ThemeProvider } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { theme } from "./theme";

//pages
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignIn";
import Registration from "./pages/Registration";
import Settings from "./pages/Settings";

import CreatorProjects from "./pages/creator-dashboard/CreatorProjects";
import CreatorPageConfig from "./pages/creator-dashboard/CreatorPageConfig";
import CreatorAnalytics from "./pages/creator-dashboard/CreatorAnalytics";
import PatronCommissions from "./pages/patron-dashboard/PatronCommissions";
import { SidebarProvider } from "./context/SidebarContext";
import CreatorPage from "./pages/creator-public-pages/CreatorPage";
import CreateBrief from "./pages/creator-public-pages/CreateBrief";
import DashboardLayout from "./pages/creator-dashboard/DashboardLayout";
import PrivateRoute from "./components/PrivateRoute";
import ProjectTracker from "./pages/project-tracker/ProjectTracker";
import { SnackbarContext } from "./context/SnackbarContext";

function App() {
  const fetchData = useFetch();
  const initAuthId = JSON.parse(localStorage.getItem("authId")!);
  const initAccessToken = JSON.parse(localStorage.getItem("accessToken")!);
  const initEmail = JSON.parse(localStorage.getItem("authEmail")!);
  // states
  const [accessToken, setAccessToken] = useState(initAccessToken);
  const [authId, setAuthId] = useState(initAuthId);
  const [email, setEmail] = useState(initEmail);
  const [userArray, setUserArray] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  //snackbar state variables
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "warning"
  >("success");

  //snackbar functions
  const showSnackbar = (message: string, severity: "success" | "warning") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const snackbarFunctions = {
    showSnackbar,
  };

  //endpoints

  // get user and patron info with authid
  const getUserInfo = async () => {
    if (!authId) return;
    const res: data = await fetchData("/api/users/" + authId);

    // Store userInfo to localStorage and set as initial state
    const userInfo = res.data.users;

    // Set current user and user info
    setCurrentUser(userInfo[0]);
    setUserArray(userInfo);
  };

  // when user logs in, userId is updated and app gets user info
  useEffect(() => {
    getUserInfo();
  }, [authId]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("authId");
    localStorage.removeItem("authEmail");
    setAccessToken("");
    setAuthId("");
    setCurrentUser({});
    setUserArray([]);
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <SnackbarContext.Provider value={snackbarFunctions}>
          <SidebarProvider>
            <UserContext.Provider
              value={{
                email,
                setEmail,
                accessToken,
                setAccessToken,
                currentUser,
                setCurrentUser,
                userArray,
                setUserArray,
                authId,
                setAuthId,
              }}
            >
              <CssBaseline />

              <Routes>
                {/* landing page, signin and registration */}
                <Route path="/" element={<LandingPage></LandingPage>}></Route>
                <Route
                  path="/sign-in"
                  element={<SignInPage></SignInPage>}
                ></Route>
                <Route
                  path="/registration"
                  element={<Registration></Registration>}
                ></Route>

                {/* shared pages */}

                <Route
                  path="/dashboard/*"
                  element={
                    <PrivateRoute>
                      <DashboardLayout handleLogout={handleLogout}>
                        <Routes>
                          <Route
                            path="/projects"
                            element={<CreatorProjects />}
                          ></Route>
                          <Route
                            path="/pagesetup"
                            element={<CreatorPageConfig />}
                          ></Route>
                          <Route
                            path="/analytics"
                            element={<CreatorAnalytics />}
                          ></Route>
                          <Route
                            path="/commissions"
                            element={<PatronCommissions />}
                          ></Route>
                          <Route
                            path="/settings"
                            element={
                              <Settings getUserInfo={getUserInfo}></Settings>
                            }
                          ></Route>
                          <Route
                            path="/projects/:project_id"
                            element={<ProjectTracker></ProjectTracker>}
                          ></Route>
                        </Routes>
                      </DashboardLayout>
                    </PrivateRoute>
                  }
                ></Route>

                <Route
                  path="/creators/:creator_id"
                  element={<CreatorPage></CreatorPage>}
                ></Route>
                <Route
                  path="/creators/createbrief/:creator_id"
                  element={
                    <PrivateRoute>
                      <CreateBrief></CreateBrief>
                    </PrivateRoute>
                  }
                ></Route>

                <Route
                  path="/projects/:project_id"
                  element={<ProjectTracker></ProjectTracker>}
                ></Route>
              </Routes>

              <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar
                  open={openSnackbar}
                  autoHideDuration={2000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity={snackbarSeverity}
                    sx={{ width: "100%" }}
                  >
                    {snackbarMessage}
                  </Alert>
                </Snackbar>
              </Stack>
            </UserContext.Provider>
          </SidebarProvider>
        </SnackbarContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
