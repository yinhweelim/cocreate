import React, { useState, useContext, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import UserContext from "../../context/UserContext";
import { data, CreatorData } from "../../interfaces";
import { Stack, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
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
import CreatorPortfolioCard from "../../components/CreatorPortfolioCard";

const CreatorProfile = () => {
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

  //logo state variable
  const [selectedLogo, setSelectedLogo] = useState(null);

  // portfolio project state variables
  const [openAddPortfolioItem, setOpenAddPortfolioItem] = useState(false); //dialog
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [selectedPortfolioImage, setSelectedPortfolioImage] = useState(null);

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

  //fetch portfolio projects on first mount
  const getPortfolioProjects = async () => {
    try {
      const res: data = await fetchData("/api/creators/portfolio/" + creatorId);
      setPortfolioItems(res.data.items);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  useEffect(() => {
    getCreatorData();
    getPortfolioProjects();
  }, []);

  //update creator profile
  const handleUpdateCreator = async (
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

    const res: data = await fetchData(
      "/api/creators/" + creatorId,
      "PATCH",
      requestBody
    );
    if (res.ok) {
      setSnackbarSeverity("success");
      setSnackbarMessage("Profile updated successfully");
      setOpenSnackbar(true);
      getCreatorData();
    } else {
      console.log(JSON.stringify(res.data));
      setSnackbarSeverity("warning");
      setSnackbarMessage("Profile update failed");
      setOpenSnackbar(true);
    }
  };

  //upload creator logo
  const handleImageUpload = async (event: any) => {
    const imageFile = event.target.files[0];
    setSelectedLogo(imageFile);

    const formData = new FormData();
    formData.append("image", imageFile);
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/api/creators/logos/" + creatorId,
      {
        method: "PATCH",
        headers: {},
        body: formData,
      }
    );
    const data: any = await res.json();

    let returnValue = {};
    if (res.ok) {
      if (data.status === "error") {
        returnValue = { ok: false, data: data.msg };
        setSnackbarSeverity("warning");
        setSnackbarMessage("Logo upload failed");
        setOpenSnackbar(true);
      } else {
        returnValue = { ok: true, data };
        setSnackbarSeverity("success");
        setSnackbarMessage("Logo updated successfully");
        setOpenSnackbar(true);
        getCreatorData();
      }
    } else {
      if (data?.errors && Array.isArray(data.errors)) {
        const messages = data.errors.map((item: any) => item.msg);
        returnValue = { ok: false, data: messages };
      } else if (data?.status === "error") {
        returnValue = { ok: false, data: data.message || data.msg };
      } else {
        console.log(data);
        returnValue = { ok: false, data: "An error has occurred" };
      }
    }

    return returnValue;
  };

  //upload portfolio image for preview
  const handleSelectPortfolioImage = (event: any) => {
    const imageFile = event.target.files[0];
    setSelectedPortfolioImage(imageFile);
  };

  //add portfolio project
  const handleAddPortfolioProject = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    console.log("add portfolio item");
    event.preventDefault();

    //construct request body
    const submittedData = new FormData(event.currentTarget);

    const requestBody = {
      title: submittedData.get("title"),
      caption: submittedData.get("description"),
    };
    console.log(requestBody);

    //append image and body to formData
    const formData = new FormData();
    if (selectedPortfolioImage) {
      formData.append("image", selectedPortfolioImage);
    }
    formData.append("title", requestBody.title as string);
    formData.append("caption", requestBody.caption as string);
    console.log(formData);

    const res = await fetch(
      import.meta.env.VITE_SERVER + "/api/creators/portfolio/" + creatorId,
      {
        method: "PUT",
        headers: {},
        body: formData,
      }
    );
    const data: any = await res.json();

    let returnValue = {};
    if (res.ok) {
      if (data.status === "error") {
        returnValue = { ok: false, data: data.msg };
        setSelectedPortfolioImage(null); //reset default
        setSnackbarSeverity("warning");
        setSnackbarMessage("Portfolio item upload failed");
        setOpenSnackbar(true);
        setOpenAddPortfolioItem(false);
      } else {
        returnValue = { ok: true, data };
        setSnackbarSeverity("success");
        setSnackbarMessage("Portfolio item updated successfully");
        setOpenSnackbar(true);
        setOpenAddPortfolioItem(false);
        getPortfolioProjects();
      }
    } else {
      if (data?.errors && Array.isArray(data.errors)) {
        const messages = data.errors.map((item: any) => item.msg);
        returnValue = { ok: false, data: messages };
      } else if (data?.status === "error") {
        returnValue = { ok: false, data: data.message || data.msg };
      } else {
        console.log(data);
        returnValue = { ok: false, data: "An error has occurred" };
      }
    }

    return returnValue;
  };

  //close dialog to add portfolio item
  const handleCloseAddPortfolioProject = () => {
    setOpenAddPortfolioItem(false);
  };

  //delete portfolio project
  const handleDeletePortfolioProject = async (projectId: string) => {
    console.log(`Delete project with ID: ${projectId}`);

    const res: data = await fetchData(
      "/api/creators/portfolio/" + projectId,
      "DELETE",
      undefined,
      undefined
    );

    if (res.ok) {
      setSnackbarSeverity("success");
      setSnackbarMessage("Portfolio item deleted successfully");
      getPortfolioProjects();
      setOpenSnackbar(true);
      getPortfolioProjects();
    } else {
      console.log(JSON.stringify(res.data));
      setSnackbarSeverity("warning");
      setSnackbarMessage("Failed to delete portfolio item");
      setOpenSnackbar(true);
    }
  };

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
            {/* Profile */}
            <Grid item xs={9}>
              <Paper variant="outlined">
                <Typography variant="h6" component="h4" padding={2}>
                  Profile
                </Typography>
                <Typography variant="body1" component="body" padding={2}>
                  Use this space to introduce yourself, your work, and give
                  potential patrons an idea of what they can expect.
                </Typography>

                <Typography variant="body2" paddingX={2}>
                  Brand Logo
                </Typography>

                {/* //logo upload and preview */}
                <Box paddingX={2}>
                  <Card>
                    {selectedLogo ? (
                      <CardMedia
                        component="img"
                        alt="Selected"
                        src={URL.createObjectURL(selectedLogo)}
                        sx={{ maxHeight: "100px", maxWidth: "300px" }}
                      />
                    ) : (
                      <>
                        {creatorData?.logo_image_url ? (
                          <CardMedia
                            component="img"
                            alt="Logo"
                            src={creatorData?.logo_image_url}
                            sx={{ maxHeight: "100px", maxWidth: "300px" }}
                          />
                        ) : (
                          <CardContent>No image</CardContent>
                        )}
                      </>
                    )}
                  </Card>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="image-upload-button"
                    type="file"
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="image-upload-button">
                    <Button
                      variant="outlined"
                      component="span"
                      color="primary"
                      size="small"
                      startIcon={<EditIcon></EditIcon>}
                    >
                      Upload image
                    </Button>
                  </label>
                </Box>
                <Box
                  component="form"
                  onSubmit={handleUpdateCreator}
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
                    defaultValue={creatorData?.country_of_operation}
                    renderInput={(params) => (
                      <TextField
                        name="country"
                        margin="normal"
                        {...params}
                        label="Country of Operations"
                      />
                    )}
                  />

                  <TextField
                    margin="normal"
                    multiline
                    minRows={4}
                    fullWidth
                    id="about"
                    label="About"
                    name="about"
                    defaultValue={creatorData?.about}
                    placeholder="Add a description to to let people know more about who you are, what you create and projects you're open to."
                  />

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

            {/* Portfolio product image upload */}
            <Grid item xs={9}>
              <Paper variant="outlined">
                <Typography variant="h6" component="h4" padding={2}>
                  Portfolio projects
                </Typography>
                <Typography variant="body1" component="body" padding={2}>
                  Upload pictures and descriptions of portfolio projects to show
                  people examples of what you can do. Upload up to 3 projects.
                </Typography>
                <Grid
                  container
                  flexDirection={"row"}
                  spacing={1}
                  paddingLeft={2}
                >
                  {portfolioItems?.map((data: any, index: number) => (
                    <CreatorPortfolioCard
                      key={index}
                      {...data}
                      cardHeight="250"
                      onDelete={() => handleDeletePortfolioProject(data.id)}
                    />
                  ))}
                </Grid>
                <Box sx={{ mt: 1 }} paddingX={2}>
                  <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    startIcon={<ModeEditOutlineOutlinedIcon />}
                    onClick={() => {
                      setOpenAddPortfolioItem(true);
                    }}
                  >
                    Add Portfolio item
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Social media links */}
            {/* <Grid item xs={9}>
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
                <Box
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

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Add
                  </Button>
                </Box>
              </Paper>
            </Grid> */}
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

        {/* dialog for add portfolio project */}
        <Dialog
          open={openAddPortfolioItem}
          onClose={handleCloseAddPortfolioProject}
        >
          <DialogTitle>Add Portfolio project</DialogTitle>
          <Box component="form" onSubmit={handleAddPortfolioProject} noValidate>
            <DialogContent>
              <Typography variant="body1">Upload image</Typography>
              <Card>
                {selectedPortfolioImage ? (
                  <CardMedia
                    component="img"
                    alt="portfolioimage"
                    src={URL.createObjectURL(selectedPortfolioImage)}
                    sx={{ maxWidth: "300px" }}
                  />
                ) : (
                  <CardContent>No image</CardContent>
                )}
              </Card>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="portfolio-image-upload-button"
                type="file"
                onChange={handleSelectPortfolioImage}
              />
              <label htmlFor="portfolio-image-upload-button">
                <Button
                  variant="outlined"
                  component="span"
                  color="primary"
                  size="small"
                  startIcon={<EditIcon></EditIcon>}
                >
                  Add new
                </Button>
              </label>
              <TextField
                autoFocus
                margin="normal"
                fullWidth
                id="name"
                label="Title"
                name="title"
                type="text"
                placeholder="Project title"
              />
              <TextField
                autoFocus
                multiline
                minRows={2}
                margin="normal"
                fullWidth
                id="name"
                label="Description"
                name="description"
                type="text"
                placeholder="Add a short description of this project"
              />

              {/* <input onChange={fileSelected} type="file" accept="image/*"></input>
            <Button onClick={submit}>Add image</Button> */}
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" type="submit">
                Add
              </Button>
              <Button
                variant="outlined"
                onClick={handleCloseAddPortfolioProject}
              >
                Cancel
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </>
    );
};

export default CreatorProfile;
