import { useState } from "react";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import UserContext from "./context/UserContext";
import useFetch from "./hooks/useFetch";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

//theme
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

//pages
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
  // const fetchData = useFetch();
  const initAuthId = JSON.parse(localStorage.getItem("authId")!);
  const initAccessToken = JSON.parse(localStorage.getItem("accessToken")!);

  // states
  const [accessToken, setAccessToken] = useState(initAccessToken);
  const [authId, setAuthId] = useState(initAuthId);
  const [userInfo, setUserInfo] = useState({});

  //endpoints

  // get user and patron info with authid
  // const getUserInfo = async () => {
  //   const res = await fetchData("/auth/accounts/" + userId);

  //   // Store userInfo to localStorage and set as initial state
  //   localStorage.setItem("userInfo", JSON.stringify(res.data));

  //   // Set initial userInfo from localStorage after component mounts
  //   const initUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  //   if (initUserInfo) {
  //     setUserInfo(initUserInfo);
  //   }
  // };

  //when user logs in, userId is updated and app gets user info
  // useEffect(() => {
  //   getUserInfo();
  // }, [userId]);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <SidebarProvider>
          <UserContext.Provider
            value={{
              accessToken,
              setAccessToken,
              userInfo,
              setUserInfo,
              authId,
              setAuthId,
              // getUserInfo,
            }}
          >
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
          </UserContext.Provider>
        </SidebarProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
