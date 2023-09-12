import React, { ReactNode } from "react";
import { useState } from "react";

//MUI components
import {
  Box,
  Grid,
  Button,
  Stack,
  Divider,
  Snackbar,
  Container,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

//custom components
import Sidebar from "../../components/Sidebar";
import { useSnackbar, SnackbarContext } from "../../context/SnackbarContext";

interface DashboardLayoutProps {
  children: ReactNode;
  handleLogout: () => void | null;
}

function DashboardLayout({ children, handleLogout }: DashboardLayoutProps) {
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

  return (
    <>
      {/* Dashboard layout */}
      <SnackbarContext.Provider value={snackbarFunctions}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex" }}>
            <Sidebar handleLogout={handleLogout}></Sidebar>
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
        </Container>
      </SnackbarContext.Provider>
    </>
  );
}

export default DashboardLayout;
