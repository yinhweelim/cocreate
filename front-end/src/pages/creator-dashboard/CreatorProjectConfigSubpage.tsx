import React, { useState, useContext, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import UserContext from "../../context/UserContext";
import { data, CreatorData } from "../../interfaces";
import { Stack, Snackbar, FormControlLabel, Checkbox } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import {
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Autocomplete,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const CreatorProjectConfig = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [creatorData, setCreatorData] = useState<CreatorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const creatorId = userCtx?.currentUser.creator_id;

  //snackbar state variables
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "warning"
  >("success");

  //fetch creator data on first mount
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

  //submit data
  const handleUpdateProfile = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    interface UpdateProfileRequestBody {
      project_description_guideline?: string | null;
      payment_instructions?: string | null;
      lead_time_in_weeks?: number | null;
      slots_per_month?: number | null;
    }

    const requestBody: UpdateProfileRequestBody = {};

    const project_description_guideline = data.get("briefDescriptionGuide");
    if (project_description_guideline) {
      requestBody.project_description_guideline =
        project_description_guideline.toString();
    }

    const payment_instructions = data.get("paymentInstructions");
    if (payment_instructions) {
      requestBody.payment_instructions = payment_instructions.toString();
    }

    const lead_time_in_weeks = data.get("leadTime");
    if (lead_time_in_weeks) {
      requestBody.lead_time_in_weeks = parseInt(lead_time_in_weeks.toString());
    }

    const slots_per_month = data.get("slotsPerMonth");
    if (slots_per_month) {
      requestBody.slots_per_month = parseInt(slots_per_month.toString());
    }

    const res: data = await fetchData(
      "/api/creators/" + creatorId,
      "PATCH",
      requestBody
    );
    if (res.ok) {
      setSnackbarSeverity("success");
      setSnackbarMessage("Project settings updated successfully");
      setOpenSnackbar(true);
    } else {
      console.log(JSON.stringify(res.data));
      setSnackbarSeverity("warning");
      setSnackbarMessage("Project settings update failed");
      setOpenSnackbar(true);
    }
  };

  const handleUpdateProducts = () => {};

  //snackbar functions
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

  //load page
  if (isLoading) {
    return <div>Loading...</div>;
  } else
    return (
      <>
        <Grid container paddingY={4}>
          <Grid container rowSpacing={2}>
            {/* Request form settings */}
            <Grid item xs={9}>
              <Paper variant="outlined">
                <Typography variant="h6" component="h4" padding={2}>
                  Request form settings
                </Typography>
                <Typography variant="body1" component="body" padding={2}>
                  Set up your project request form. Patrons will see these
                  guidelines when they submit a request to you.
                </Typography>

                <Box
                  component="form"
                  onSubmit={handleUpdateProfile}
                  noValidate
                  sx={{ mt: 1 }}
                  paddingX={2}
                >
                  <TextField
                    margin="normal"
                    fullWidth
                    multiline
                    id="briefDescriptionGuide"
                    label="Request guidelines"
                    name="briefDescriptionGuide"
                    placeholder="What you want your patrons to enter in the request description box. The more specific the better"
                    defaultValue={creatorData?.project_description_guideline}
                  />

                  <TextField
                    margin="normal"
                    fullWidth
                    multiline
                    id="paymentInstructions"
                    label="Payment instructions"
                    name="paymentInstructions"
                    placeholder="Short description of your payment terms. E.g. your bank account information, payment deadlines"
                    defaultValue={creatorData?.payment_instructions}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Save
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Project preferences */}
            <Grid item xs={9}>
              <Paper variant="outlined">
                <Typography variant="h6" component="h4" padding={2}>
                  Project preferences
                </Typography>
                <Typography variant="body1" component="body" padding={2}>
                  Set up your project preferences. These will be displayed on
                  your page.
                </Typography>

                <Box
                  component="form"
                  onSubmit={handleUpdateProfile}
                  noValidate
                  sx={{ mt: 1 }}
                  paddingX={2}
                >
                  <TextField
                    margin="normal"
                    fullWidth
                    id="slotsPerMonth"
                    label="Slots per month"
                    name="slotsPerMonth"
                    type="number"
                    placeholder="Display how many project slots you offer per month."
                    defaultValue={creatorData?.slots_per_month}
                  />

                  <TextField
                    margin="normal"
                    fullWidth
                    id="leadtime"
                    label="Lead time in weeks"
                    name="leadTime"
                    type="number"
                    placeholder="Display how much lead time your projects typically need."
                    defaultValue={creatorData?.lead_time_in_weeks}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Save
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Products and services */}
            <Grid item xs={9}>
              <Paper variant="outlined">
                <Typography variant="h6" component="h4" padding={2}>
                  Products and Services
                </Typography>
                <Typography variant="body1" component="body" padding={2}>
                  Provide up to 3 sample product options that potential patrons
                  can choose from.
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleUpdateProducts}
                  noValidate
                  sx={{ mt: 1 }}
                  paddingX={2}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Add
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Project process */}
            <Grid item xs={9}>
              <Paper variant="outlined">
                <Typography variant="h6" component="h4" padding={2}>
                  Project process
                </Typography>
                <Typography variant="body1" component="body" padding={2}>
                  Set up your project stages to give your patrons an idea of
                  what to expect in process of commissionning work with you.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

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
      </>
    );
};

export default CreatorProjectConfig;
