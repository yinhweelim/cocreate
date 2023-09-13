import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useSnackbar } from "../../context/SnackbarContext";
import { data, CreatorData } from "../../interfaces";
import EditIcon from "@mui/icons-material/Edit";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
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

interface CreatorProfileProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  creatorId: string;
  handleUpdateCreator: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  creatorData: CreatorData | null;
  getCreatorData: () => Promise<void>;
}

const CreatorProfile = (props: CreatorProfileProps) => {
  const fetchData = useFetch();
  const { showSnackbar } = useSnackbar();

  //logo state variable
  const [selectedLogo, setSelectedLogo] = useState(null);

  // portfolio project state variables
  const [openAddPortfolioItem, setOpenAddPortfolioItem] = useState(false); //dialog
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [selectedPortfolioImage, setSelectedPortfolioImage] = useState(null);

  //fetch portfolio projects on first mount
  const getPortfolioProjects = async () => {
    try {
      props.setIsLoading(true);
      const res: data = await fetchData(
        "/api/creators/portfolio/" + props.creatorId
      );
      setPortfolioItems(res.data.items);
      props.setIsLoading(false);
    } catch (error) {
      props.setIsLoading(false);
      alert(JSON.stringify(error));
    }
  };

  useEffect(() => {
    getPortfolioProjects();
  }, [props.creatorId]);

  //upload creator logo
  const handleUpdateLogo = async (event: any) => {
    const imageFile = event.target.files[0];
    setSelectedLogo(imageFile);

    const formData = new FormData();
    formData.append("image", imageFile);
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/api/creators/logos/" + props.creatorId,
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
        showSnackbar("Logo upload failed", "warning");
      } else {
        returnValue = { ok: true, data };
        showSnackbar("Logo updated successfully", "success");
        props.getCreatorData();
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
      import.meta.env.VITE_SERVER +
        "/api/creators/portfolio/" +
        props.creatorId,
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
        showSnackbar("Portfolio item upload failed", "warning");
        setOpenAddPortfolioItem(false);
      } else {
        returnValue = { ok: true, data };
        setSelectedPortfolioImage(null); //reset default
        showSnackbar("Portfolio item updated successfully", "success");
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
    const res: data = await fetchData(
      "/api/creators/portfolio/" + projectId,
      "DELETE",
      undefined,
      undefined
    );

    if (res.ok) {
      showSnackbar("Portfolio item deleted successfully", "success");
      getPortfolioProjects();
    } else {
      console.log(JSON.stringify(res.data));
      showSnackbar("Failed to delete portfolio item", "warning");
    }
  };

  //load page
  if (props.creatorData === null) {
    return <Typography variant="body1">Loading...</Typography>;
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
                <Typography variant="body1" padding={2}>
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
                        {props.creatorData?.logo_image_url ? (
                          <CardMedia
                            component="img"
                            alt="Logo"
                            src={props.creatorData?.logo_image_url}
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
                    onChange={handleUpdateLogo}
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
                  onSubmit={props.handleUpdateCreator}
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
                    defaultValue={props.creatorData?.display_name}
                  />

                  <TextField
                    margin="normal"
                    fullWidth
                    id="tagline"
                    label="Tagline"
                    name="tagline"
                    placeholder="Add a short tagline to let people know more about who you are"
                    defaultValue={props.creatorData?.tagline}
                  />

                  <Autocomplete
                    disablePortal
                    options={["SINGAPORE", "UNITED STATES"]}
                    defaultValue={props.creatorData?.country_of_operation}
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
                    defaultValue={props.creatorData?.about}
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
                <Typography variant="body1" padding={2}>
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
                <Typography variant="body1" paddingX={2}>
                  Help people find you wherever you are. Connect your other
                  accounts to show them on your page. We'll never post on your
                  behalf.
                </Typography>
                <Box sx={{ mt: 1 }} paddingX={2}>
                  <Card>
                    <CardContent>
                      <Typography  variant="body1">
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
