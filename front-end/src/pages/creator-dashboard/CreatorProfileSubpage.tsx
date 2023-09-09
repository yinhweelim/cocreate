import React, { useState, useContext, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { data, CreatorData } from "../../interfaces";
import { Stack, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

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
} from "@mui/material";

const CreatorProfile = () => {
  const navigate = useNavigate();
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [pageName, setPageName] = useState("");
  const [bio, setBio] = useState("");
  const [about, setAbout] = useState("");
  const [country, setCountry] = useState("");
  const [creatorData, setCreatorData] = useState<CreatorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  //snackbar state variables
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "warning"
  >("success");

  //fetch creator data on first mount
  const creatorId = userCtx?.currentUser.creator_id;
  console.log(creatorId);

  const getCreatorData = async () => {
    // Set isLoading to true before making the API call
    setIsLoading(true);

    try {
      const res: data = await fetchData("/api/creators/" + creatorId);
      setCreatorData(res.data.creator);
    } catch (error) {
      alert(JSON.stringify(res.data));
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

    const requestBody = {
      display_name: data.get("pageName"),
      tagline: data.get("tagline"),
      country_of_operation: data.get("country"),
      about: data.get("about"),
    };
    console.log(requestBody);

    const res: data = await fetchData(
      "/api/creators/" + creatorId,
      "PATCH",
      requestBody
    );
    if (res.ok) {
      setSnackbarSeverity("success");
      setSnackbarMessage("Profile updated successfully");
      setOpenSnackbar(true);
    } else {
      console.log(JSON.stringify(res.data));
      setSnackbarSeverity("warning");
      setSnackbarMessage("Profile update failed");
      setOpenSnackbar(true);
    }
  };

  const handleUpdateGallery = () => {};

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
          <Grid container xs={9} rowSpacing={2}>
            {/* Profile */}
            <Grid item xs={12}>
              <Paper variant="outlined">
                <Typography variant="h6" component="h4" padding={2}>
                  Profile
                </Typography>
                <Typography variant="body1" component="body" paddingX={2}>
                  Use this space to introduce yourself, your work, and give
                  potential patrons an idea of what they can expect.
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
                    id="pageName"
                    label="Page Name"
                    name="pageName"
                    defaultValue={creatorData?.display_name}
                  />

                  <TextField
                    margin="normal"
                    fullWidth
                    id="tagline"
                    label="Tagline"
                    name="tagline"
                    placeholder="Add a short tagline to let people know more about who you are"
                    defaultValue={creatorData?.tagline}
                  />

                  <Autocomplete
                    disablePortal
                    options={["SINGAPORE", "UNITED STATES"]}
                    inputValue={country}
                    defaultValue={creatorData?.country_of_operation}
                    onInputChange={(event, newInputValue) => {
                      setCountry(newInputValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        name="country"
                        margin="normal"
                        {...params}
                        label="Country of Operation"
                      />
                    )}
                  />

                  <TextField
                    margin="normal"
                    multiline
                    fullWidth
                    id="about"
                    label="About"
                    name="about"
                    defaultValue={creatorData?.about}
                    placeholder="Add a description to to let people know more about who you are, what you create and projects you're open to."
                  />

                  {/* <FormControlLabel
                control={<Checkbox value="showProjectCount" color="primary" />}
                label="Show total project count"
              /> */}
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Update
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Gallery image upload */}
            <Grid item xs={12}>
              <Paper variant="outlined">
                <Typography variant="h6" component="h4" padding={2}>
                  Portfolio projects
                </Typography>
                <Typography variant="body1" component="body" padding={2}>
                  Upload pictures and short descriptions of portfolio projects
                  to show people examples of what you can do. Upload up to 6
                  projects.
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleUpdateGallery}
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
            <Grid item xs={12}>
              <Paper variant="outlined">
                <Typography variant="h6" component="h4" padding={2}>
                  Social media links
                </Typography>
                <Typography variant="body1" component="body" paddingX={2}>
                  Help people find you wherever you are. Connect your other
                  accounts to show them on your page. We'll never post on your
                  behalf.
                </Typography>
                <Box sx={{ mt: 1 }} paddingX={2}>
                  <Card>
                    <CardContent>
                      <Typography component="body" variant="body1">
                        Social media link 1
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
                {/* <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
              paddingX={2}
            >
              <TextField
                margin="normal"
                fullWidth
                id="socialmediatype"
                label="Type"
                name="socialMediaType"
                autoFocus
              />

              <TextField
                margin="normal"
                fullWidth
                id="socialmediaurl"
                label="URL"
                name="socialMediaURL"
                autoFocus
              />

              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Add
              </Button>
            </Box> */}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
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

export default CreatorProfile;
