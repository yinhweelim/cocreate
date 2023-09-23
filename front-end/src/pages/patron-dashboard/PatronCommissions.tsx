import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../../context/UserContext";
import useFetch from "../../hooks/useFetch";

import SectionHeading from "../../components/SectionHeading";
import { data, Brief } from "../../interfaces";
import ProjectBriefCard from "../../components/PatronBriefCard";
import AddAPhoto from "@mui/icons-material/AddAPhoto";
import { useSnackbar } from "../../context/SnackbarContext";
import CreatorProjectCard from "../../components/CreatorProjectCard";

import {
  Box,
  Grid,
  Button,
  Stack,
  Divider,
  Typography,
  CardMedia,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const PatronCommissions = () => {
  const { showSnackbar } = useSnackbar();
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const patronId: string = userCtx?.currentUser.user_id;
  const navigate = useNavigate();

  //brief variables
  const [briefs, setBriefs] = useState([]);
  const [openUpdateBrief, setOpenUpdateBrief] = useState(false); //dialog to manage brief
  const [selectedBrief, setSelectedBrief] = useState<Brief | null>(null); // selected brief for update
  const [selectedBriefImage, setSelectedBriefImage] = useState(null);

  //project variables
  const [projects, setProjects] = useState([]);

  //fetch briefs
  const getBriefs = async () => {
    // Set isLoading to true before making the API call
    setIsLoading(true);

    try {
      const res: data = await fetchData(
        "/api/projects/briefs/patrons/" + patronId,
        undefined,
        undefined,
        userCtx?.accessToken
      );
      setBriefs(res.data.briefs);
    } catch (error) {
      alert(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  //get projects
  const getProjects = async () => {
    try {
      const res: data = await fetchData(
        "/api/projects/patrons/" + patronId,
        undefined,
        undefined,
        userCtx?.accessToken
      );
      setProjects(res.data.projects);
    } catch (error) {
      alert(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBriefs();
    getProjects();
  }, []);

  //update brief image
  const updateBriefImage = async (event: any) => {
    const imageFile = event.target.files[0];
    setSelectedBriefImage(imageFile);

    const formData = new FormData();
    formData.append("image", imageFile);
    const res = await fetch(
      import.meta.env.VITE_SERVER +
        "/api/projects/briefs/images/" +
        selectedBrief?.id,
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
        showSnackbar("Image update failed", "warning");
      } else {
        returnValue = { ok: true, data };
        getBriefs();
        showSnackbar("Image updated successfully", "success");
        setOpenUpdateBrief(false);
      }
    } else {
      if (data?.errors && Array.isArray(data.errors)) {
        const messages = data.errors.map((item: any) => item.msg);
        returnValue = { ok: false, data: messages };
        console.error(returnValue);
      } else if (data?.status === "error") {
        returnValue = { ok: false, data: data.message || data.msg };
        console.error(returnValue);
      } else {
        returnValue = { ok: false, data: "An error has occurred" };
        console.error(returnValue);
      }
      setOpenUpdateBrief(false);
    }
  };

  //update brief
  const handleUpdateBrief = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submittedData = new FormData(event.currentTarget);
    const details = submittedData.get("details");
    // @ts-ignore
    const budget_amount = parseInt(submittedData.get("budget_amount"), 10);

    const res: data = await fetchData(
      "/api/projects/briefs/" + selectedBrief?.id,
      "PATCH",
      {
        details,
        budget_amount,
      },
      userCtx?.accessToken
    );
    if (res.ok) {
      setOpenUpdateBrief(false);
      showSnackbar("Brief updated successfully", "success");
      getBriefs();
    } else {
      console.log(res.data);
      setOpenUpdateBrief(false);
      showSnackbar("Brief update failed", "warning");
    }
  };

  //cancel brief
  const handleCancelBrief = async () => {
    const res: data = await fetchData(
      "/api/projects/briefs/" + selectedBrief?.id,
      "PATCH",
      { status: "CANCELLED" },
      userCtx?.accessToken
    );

    if (res.ok) {
      showSnackbar("Brief cancelled", "success");
      getBriefs();
      setOpenUpdateBrief(false);
    } else {
      console.log(JSON.stringify(res.data));
      showSnackbar("Failed to cancel brief", "warning");
      setOpenUpdateBrief(false);
    }
  };

  //close dialog to add portfolio item
  const handleCloseAddBrief = () => {
    setOpenUpdateBrief(false);
  };

  if (isLoading) {
    return <Typography variant="body1">Loading...</Typography>;
  } else
    return (
      <>
        <Grid container direction="column">
          {/* header with action buttons */}
          <SectionHeading
            heading={"Your Commissions"}
            actionButton={null}
          ></SectionHeading>

          <Divider />

          {/* page content */}
          <Grid container paddingY={4}>
            <Grid container flexDirection="column" rowSpacing={2}>
              <Stack paddingLeft={2} paddingBottom={4}>
                <Typography variant="overline" paddingY={1} fontSize="1rem">
                  briefs
                </Typography>

                {briefs.length == 0 ? (
                  <Typography variant="body1">
                    No briefs yet. Go out and support some creators!
                  </Typography>
                ) : (
                  ""
                )}
                <Grid container flexDirection={"row"} spacing={1}>
                  {briefs?.map((data: any, index: number) => (
                    <ProjectBriefCard
                      key={index}
                      {...data}
                      cardHeight="250"
                      onClick={() => {
                        setSelectedBrief(data);
                        setOpenUpdateBrief(true);
                      }}
                    />
                  ))}
                </Grid>
              </Stack>
              <Divider />
              <Stack paddingLeft={2} paddingTop={2}>
                <Typography variant="overline" paddingY={1} fontSize="1rem">
                  Projects
                </Typography>
                {projects.length == 0 ? (
                  <Typography variant="body1">
                    No projects yet. Go out and support some creators!
                  </Typography>
                ) : (
                  <Grid container flexDirection={"row"} spacing={1}>
                    {projects?.map((data: any, index: number) => (
                      <CreatorProjectCard
                        key={index}
                        {...data}
                        cardHeight="250"
                        onClick={() => {
                          navigate("/dashboard/projects/" + data.id);
                        }}
                      />
                    ))}
                  </Grid>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        {/* dialog for add portfolio project */}
        <Dialog open={openUpdateBrief} onClose={handleCloseAddBrief}>
          <DialogTitle>Manage Brief</DialogTitle>
          <Box component="form" onSubmit={handleUpdateBrief} noValidate>
            <DialogContent>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                paddingBottom={2}
              >
                <Grid item xs={6}>
                  {" "}
                  <Typography variant="overline">Creator</Typography>
                  <br />
                  <Typography variant="body1">
                    {selectedBrief?.creator_name} <br />
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  {" "}
                  <Typography variant="overline">Product</Typography>
                  <br />
                  <Typography variant="body1">
                    {selectedBrief?.product_name} <br />
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  {" "}
                  <Typography variant="overline">Status</Typography>
                  <br />
                  <Typography variant="body1">
                    {selectedBrief?.status} <br />
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  {" "}
                  <Typography variant="overline">Request sent</Typography>
                  <br />
                  <Typography variant="body1">
                    {selectedBrief?.created_at} <br />
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="overline" paddingTop={2}>
                Your request
              </Typography>

              <Card>
                {selectedBriefImage ? (
                  <CardMedia
                    component="img"
                    alt="portfolioimage"
                    src={URL.createObjectURL(selectedBriefImage)}
                    sx={{ maxWidth: "200px" }}
                  />
                ) : selectedBrief?.image_url ? (
                  <CardMedia
                    component="img"
                    alt="portfolioimage"
                    src={selectedBrief?.image_url}
                    sx={{ maxWidth: "200px" }}
                  />
                ) : (
                  <CardContent>No image</CardContent>
                )}
              </Card>

              {selectedBrief?.status === "PENDING_RESPONSE" ? (
                <>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="brief-image-upload-button"
                    type="file"
                    onChange={updateBriefImage}
                  />
                  <label htmlFor="brief-image-upload-button">
                    <Button
                      variant="outlined"
                      component="span"
                      color="primary"
                      size="small"
                      startIcon={<AddAPhoto></AddAPhoto>}
                    >
                      Update
                    </Button>
                  </label>
                </>
              ) : (
                ""
              )}

              <TextField
                disabled={selectedBrief?.status !== "PENDING_RESPONSE"}
                autoFocus
                multiline
                margin="normal"
                fullWidth
                id="name"
                label="Details"
                name="details"
                type="text"
                placeholder="Project details"
                defaultValue={selectedBrief?.details}
              />
              <TextField
                disabled={selectedBrief?.status !== "PENDING_RESPONSE"}
                margin="normal"
                fullWidth
                id="budget"
                label="Budget"
                name="budget_amount"
                type="number"
                placeholder="Update your budget"
                defaultValue={selectedBrief?.budget_amount}
              />
              {selectedBrief?.status === "PENDING_RESPONSE" ? (
                <Stack direction={"row"} spacing={1}>
                  {" "}
                  <Button variant="outlined" type="submit">
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleCancelBrief}
                  >
                    Cancel Brief
                  </Button>
                </Stack>
              ) : (
                ""
              )}
            </DialogContent>

            <DialogActions>
              <Button variant="outlined" onClick={handleCloseAddBrief}>
                Close
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </>
    );
};

export default PatronCommissions;
