import { useState, useEffect } from "react";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import UserContext from "./context/UserContext";
import useFetch from "./hooks/useFetch";
import "./App.css";
import { data } from "../src/interfaces";

//MUI and theme
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

//pages
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignIn";
import Registration from "./pages/Registration";
import Settings from "./pages/Settings";
import InitialPageSetup from "./pages/InitialPageSetup";
import CreatorProjects from "./pages/creator-dashboard/CreatorProjects";
import CreatorPageConfig from "./pages/creator-dashboard/CreatorPageConfig";
import CreatorAnalytics from "./pages/creator-dashboard/CreatorAnalytics";
import PatronCommissions from "./pages/patron-dashboard/PatronCommissions";
import { SidebarProvider } from "./context/SidebarContext";
import CreatorPage from "./pages/creator-public-pages/CreatorPage";
import CreateBrief from "./pages/creator-public-pages/CreateBrief";
import ConfirmBrief from "./pages/creator-public-pages/ConfirmBrief";
import DashboardLayout from "./pages/creator-dashboard/DashboardLayout";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const fetchData = useFetch();
  const initAuthId = JSON.parse(localStorage.getItem("authId")!);
  const initAccessToken = JSON.parse(localStorage.getItem("accessToken")!);

  // states
  const [accessToken, setAccessToken] = useState(initAccessToken);
  const [authId, setAuthId] = useState(initAuthId);
  const [userArray, setUserArray] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

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
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <SidebarProvider>
          <UserContext.Provider
            value={{
              accessToken,
              setAccessToken,
              currentUser,
              setCurrentUser,
              userArray,
              setUserArray,
              authId,
              setAuthId,
              // getUserInfo,
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
              <Route
                path="/registration/page-setup"
                element={<InitialPageSetup></InitialPageSetup>}
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
                          element={<Settings></Settings>}
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
                element={<CreateBrief></CreateBrief>}
              ></Route>
              <Route
                path="/creators/confirmBrief/:creator_id"
                element={<ConfirmBrief></ConfirmBrief>}
              ></Route>
            </Routes>
          </UserContext.Provider>
        </SidebarProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
