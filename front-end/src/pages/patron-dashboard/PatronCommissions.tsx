import React, { useContext, useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
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
} from "@mui/material";
import SectionHeading from "../../components/SectionHeading";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import useFetch from "../../hooks/useFetch";
import { data } from "../../interfaces";
import ProjectBriefCard from "../../components/ProjectBriefCard";
import AddAPhoto from "@mui/icons-material/AddAPhoto";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const PatronCommissions = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const patronId: string = userCtx?.currentUser.user_id;

  interface Brief {
    id: string;
    creator_id: string;
    creator_name: string;
    patron_id: string;
    patron_name: string;
    product_id: string;
    details: string;
    budget_currency: string;
    budget_amount: string;
    deadline: Date;
    consultation_slot: Date;
    delivery_method: string;
    status: string;
    image_url: string;
  }

  //brief variables
  const [briefs, setBriefs] = useState([]);
  const [openUpdateBrief, setOpenUpdateBrief] = useState(false); //dialog to manage brief
  const [selectedBrief, setSelectedBrief] = useState<Brief | null>(null); // selected brief for update
  const [selectedBriefImage, setSelectedBriefImage] = useState(null);

  //fetch briefs
  const getBriefs = async () => {
    // Set isLoading to true before making the API call
    setIsLoading(true);

    try {
      const res: data = await fetchData(
        "/api/projects/briefs/patrons/" + patronId
      );
      setBriefs(res.data.briefs);
    } catch (error) {
      alert(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBriefs();
  }, []);

  //brief image previes
  const handleSelectBriefImage = (event: any) => {
    const imageFile = event.target.files[0];
    setSelectedBriefImage(imageFile);
  };

  //update brief
  const handleUpdateBrief = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("update brief" + selectedBrief);
    event.preventDefault();

    //construct request body
    const submittedData = new FormData(event.currentTarget);

    const requestBody = {
      title: submittedData.get("title"),
      caption: submittedData.get("description"),
    };

    //append image and body to formData
    const formData = new FormData();
    if (selectedBriefImage) {
      formData.append("image", selectedBriefImage);
    }
    formData.append("title", requestBody.title as string);
    formData.append("caption", requestBody.caption as string);
    console.log(formData);

    const res = await fetch(
      import.meta.env.VITE_SERVER + "/api/projects/briefs/" + selectedBrief?.id,
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
        setSelectedBriefImage(null); //reset original
        // showSnackbar("Brief update failed", "warning");
        setOpenUpdateBrief(false);
      } else {
        returnValue = { ok: true, data };
        setSelectedBriefImage(null); //reset original
        // showSnackbar("Portfolio item updated successfully", "success");
        setOpenUpdateBrief(false);
        getBriefs();
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

  //cancel brief
  const handleCancelBrief = async () => {
    console.log(`Cancel brief with ID: ${selectedBrief?.id}`);

    const res: data = await fetchData(
      "/api/projects/briefs/" + selectedBrief?.id,
      "PATCH",
      { status: "CANCELLED" },
      undefined
    );

    if (res.ok) {
      // showSnackbar("Brief cancelled", "success");
      console.log("brief cancelled");
      getBriefs();
    } else {
      console.log(JSON.stringify(res.data));
      // showSnackbar("Failed to cancel brief", "warning");
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
        {/* {JSON.stringify(briefs)} */}

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

              {/* TODO: add pagination */}

              <Divider />
              <Stack paddingLeft={2} paddingTop={2}>
                <Typography variant="overline" paddingY={1} fontSize="1rem">
                  projects
                </Typography>

                <Grid container flexDirection={"row"} spacing={1}>
                  {/* TODO: Add ongoing projects */}
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        {/* dialog for add portfolio project */}
        <Dialog open={openUpdateBrief} onClose={handleCloseAddBrief}>
          <DialogTitle>Manage Brief</DialogTitle>
          <Box component="form" onSubmit={handleUpdateBrief} noValidate>
            <DialogContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                paddingBottom={2}
              >
                <Box>
                  {" "}
                  <Typography variant="overline">Creator</Typography>
                  <br />
                  <Typography variant="body1">
                    {selectedBrief?.creator_name} <br />
                  </Typography>
                </Box>
                <Box>
                  {" "}
                  <Typography variant="overline">Product</Typography>
                  <br />
                  <Typography variant="body1">
                    {selectedBrief?.product_name} <br />
                  </Typography>
                </Box>
                <Box>
                  {" "}
                  <Typography variant="overline">Request sent</Typography>
                  <br />
                  <Typography variant="body1">
                    {selectedBrief?.created_at} <br />
                  </Typography>
                </Box>
              </Stack>

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
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="brief-image-upload-button"
                type="file"
                onChange={handleSelectBriefImage}
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
              <TextField
                disabled={selectedBrief?.status === "CANCELLED"}
                autoFocus
                multiline
                minRows={2}
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
                disabled={selectedBrief?.status === "CANCELLED"}
                margin="normal"
                fullWidth
                id="budget"
                label="Budget"
                name="budget"
                type="text"
                placeholder="Update your budget"
                defaultValue={selectedBrief?.budget_amount}
              />
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
            </DialogContent>
            {selectedBrief?.status === "PENDING_RESPONSE" ? (
              <DialogActions>
                <Button variant="outlined" onClick={handleCloseAddBrief}>
                  Close
                </Button>
              </DialogActions>
            ) : (
              ""
            )}
          </Box>
        </Dialog>
      </>
    );
};

export default PatronCommissions;
