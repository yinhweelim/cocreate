import React, { ReactNode } from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import UserContext from "../../context/UserContext";
import { CreatorData, data } from "../../interfaces";
import { useSnackbar, SnackbarContext } from "../../context/SnackbarContext";

//MUI components
import { Box, Grid, Button, Stack, Divider, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

//custom components
import Sidebar from "../../components/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  //creator variables
  const creatorId = userCtx?.currentUser.creator_id;
  const [creatorData, setCreatorData] = useState<CreatorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  //snackbar state variables
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "warning"
  >("success");

  //fetch creator data and portfolio projects on first mount
  const getCreatorData = async () => {
    // Set isLoading to true before making the API call
    setIsLoading(true);

    try {
      const res: data = await fetchData("/api/creators/" + creatorId);
      setCreatorData(res.data.creator);
    } catch (error) {
      alert(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCreatorData();
  }, []);

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

  return (
    <>
      {/* Dashboard layout */}
      <SnackbarContext.Provider value={snackbarFunctions}>
        <Box sx={{ display: "flex" }}>
          <Sidebar></Sidebar>
          {children}
        </Box>

        {/* Snackbar */}

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
      </SnackbarContext.Provider>
    </>
  );
}

export default DashboardLayout;
