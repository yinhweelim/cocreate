import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import useFetch from "../../hooks/useFetch";
import { data, Brief } from "../../interfaces";
import { AddAPhoto } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Grid,
  Divider,
  Stack,
  Dialog,
  DialogTitle,
  Box,
  DialogContent,
  Card,
  CardMedia,
  CardContent,
  Button,
  TextField,
  DialogActions,
  Chip,
} from "@mui/material";
import CreatorBriefCard from "../../components/CreatorBriefCard";
import { useSnackbar } from "../../context/SnackbarContext";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
interface SubpageProps {
  isLoading: boolean;
  briefs: Brief[];
  setBriefs: React.Dispatch<React.SetStateAction<never[]>>;
  getBriefs: () => Promise<void>;
}
const CreatorRequestsSubpage = (props: SubpageProps) => {
  const navigate = useNavigate();
  const fetchData = useFetch();
  const { showSnackbar } = useSnackbar();
  const [openBrief, setOpenBrief] = useState(false); //dialog to manage brief
  const [openAddProjectDialog, setOpenAddProjectDialog] = useState(false); //dialog to manage project
  const [selectedBrief, setSelectedBrief] = useState<Brief | null>(null); // selected brief for update
  const [selectedImage, setSelectedImage] = useState(null);

  // Separate briefs into pending and all requests
  const pendingRequests = props.briefs.filter(
    (brief) => brief.status === "PENDING_RESPONSE"
  );
  const allRequests = props.briefs;
  //Variables for sort
  const [sortBy, setSortBy] = useState<"budget" | "createdAt" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [newRequestsSortBy, setNewRequestsSortBy] = useState<
    "budget" | "createdAt" | null
  >(null);
  const [newRequestsSortOrder, setNewRequestsSortOrder] = useState<
    "asc" | "desc"
  >("asc");

  //functions
  const handleAcceptBrief = async () => {
    const res: data = await fetchData(
      "/api/projects/briefs/" + selectedBrief?.id,
      "PATCH",
      { status: "ACCEPTED" },
      undefined
    );

    if (res.ok) {
      showSnackbar("Brief accepted", "success");
      props.getBriefs();
      setOpenBrief(false);
      setOpenAddProjectDialog(true);
    } else {
      console.log(JSON.stringify(res.data));
      showSnackbar("Failed to accept brief", "warning");
      setOpenBrief(false);
    }
  };

  const handleDeclineBrief = async () => {
    console.log("decline brief");
    const res: data = await fetchData(
      "/api/projects/briefs/" + selectedBrief?.id,
      "PATCH",
      { status: "DECLINED" },
      undefined
    );

    if (res.ok) {
      showSnackbar("Brief declined", "success");
      props.getBriefs();
      setOpenBrief(false);
    } else {
      console.log(JSON.stringify(res.data));
      showSnackbar("Failed to declined brief", "warning");
      setOpenBrief(false);
    }
  };

  //close dialog
  const handleCloseBrief = () => {
    setOpenBrief(false);
  };

  // add new project
  const handleAddProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");

    const res: data = await fetchData("/api/projects", "PUT", {
      name,
      brief_id: selectedBrief?.id,
      creator_id: selectedBrief?.creator_id,
      patron_id: selectedBrief?.patron_id,
    });
    if (res.ok) {
      showSnackbar("Project added successfully", "success");
      setOpenAddProjectDialog(false);
      navigate(`/dashboard/projects`);
    } else {
      showSnackbar("Something went wrong", "warning");
    }
  };

  //close dialog for project
  const handleCloseProjectDialog = () => {
    setOpenAddProjectDialog(false);
  };

  //sorting functions

  const sortedAllRequests = [...props.briefs].sort((a, b) => {
    if (sortBy === "budget") {
      return sortOrder === "asc"
        ? a.budget_amount - b.budget_amount
        : b.budget_amount - a.budget_amount;
    } else if (sortBy === "createdAt") {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });

  const handleSortAllRequestsClick = (sortField: "budget" | "createdAt") => {
    if (sortField === sortBy) {
      // Toggle the sort order if the same field is clicked again
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set the new sorting field
      setSortBy(sortField);
      setSortOrder("asc");
    }
  };

  const handleSortNewRequestsClick = (sortField: "budget" | "createdAt") => {
    if (sortField === newRequestsSortBy) {
      // Toggle the sort order if the same field is clicked again
      setNewRequestsSortOrder(newRequestsSortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set the new sorting field
      setNewRequestsSortBy(sortField);
      setNewRequestsSortOrder("asc");
    }
  };

  if (props.isLoading) {
    return <Typography variant="body1">Loading...</Typography>;
  } else
    return (
      <>
        {/* page content */}
        <Grid container paddingY={4}>
          <Grid container flexDirection="column" rowSpacing={2}>
            <Stack paddingLeft={2} paddingBottom={4}>
              <Typography variant="overline" paddingTop={1} fontSize="1rem">
                New requests
              </Typography>
              <Stack direction="row" spacing={2} paddingBottom={2}>
                <Chip
                  icon={
                    newRequestsSortBy === "budget" &&
                    newRequestsSortOrder === "asc" ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )
                  }
                  variant="outlined"
                  onClick={() => handleSortNewRequestsClick("budget")}
                  label="Budget"
                />
                <Chip
                  icon={
                    newRequestsSortBy === "createdAt" &&
                    newRequestsSortOrder === "asc" ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )
                  }
                  variant="outlined"
                  onClick={() => handleSortNewRequestsClick("createdAt")}
                  label="Created Date"
                />
              </Stack>
              {props.briefs?.length == 0 ? (
                <Typography variant="body1">
                  No new briefs yet. Go out and get some!
                </Typography>
              ) : (
                ""
              )}
              <Grid container flexDirection={"row"} spacing={1}>
                {/* only briefs that have status = PENDING_RESPONSE should be displayed here */}
                {pendingRequests?.map((data: any, index: number) => (
                  <CreatorBriefCard
                    key={index}
                    {...data}
                    cardHeight="250"
                    onClick={() => {
                      setSelectedBrief(data);
                      setOpenBrief(true);
                    }}
                  />
                ))}
              </Grid>
            </Stack>
            <Divider />
            <Stack paddingLeft={2} paddingBottom={4}>
              <Typography variant="overline" paddingTop={1} fontSize="1rem">
                All requests
              </Typography>

              <Stack direction="row" spacing={2} paddingBottom={2}>
                <Chip
                  icon={
                    sortBy === "budget" && sortOrder === "asc" ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )
                  }
                  variant="outlined"
                  onClick={() => handleSortAllRequestsClick("budget")}
                  label="Budget"
                ></Chip>
                <Chip
                  icon={
                    sortBy === "createdAt" && sortOrder === "asc" ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )
                  }
                  variant="outlined"
                  onClick={() => handleSortAllRequestsClick("createdAt")}
                  label="Created Date"
                ></Chip>
              </Stack>

              {/* all briefs should be displayed here */}
              <Grid container flexDirection={"row"} spacing={1}>
                {sortedAllRequests?.map((data: any, index: number) => (
                  <CreatorBriefCard
                    key={index}
                    {...data}
                    cardHeight="250"
                    onClick={() => {
                      setSelectedBrief(data);
                      setOpenBrief(true);
                    }}
                  />
                ))}
              </Grid>
            </Stack>
          </Grid>
        </Grid>

        {/* dialog for add portfolio project */}
        <Dialog open={openBrief} onClose={handleCloseBrief}>
          <DialogTitle>
            Project brief from {selectedBrief?.patron_name}
          </DialogTitle>

          <DialogContent>
            <Typography variant="subtitle1">
              {" "}
              Received {selectedBrief?.created_at}
            </Typography>
            <Grid container direction="row" justifyContent="space-between">
              <Grid item xs={6}>
                {" "}
                <Typography variant="overline">Option</Typography>
                <br />
                <Typography variant="body1">
                  {selectedBrief?.product_name} <br />
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {" "}
                <Typography variant="overline">Their budget</Typography>
                <br />
                <Typography variant="body1">
                  {selectedBrief?.budget_currency}
                  {selectedBrief?.budget_amount} <br />
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
                <Typography variant="overline" paddingTop={2}>
                  Delivery method
                </Typography>
                <Typography variant="body1">
                  {selectedBrief?.delivery_method} <br />
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="overline" paddingTop={2}>
              Brief details
            </Typography>
            <Typography variant="body1">
              {selectedBrief?.details} <br />
            </Typography>
            <Typography variant="overline" paddingTop={2}>
              Reference images
            </Typography>
            <Card sx={{ maxWidth: "300px" }}>
              <CardMedia
                component="img"
                alt="portfolioimage"
                src={selectedBrief?.image_url}
                sx={{ maxWidth: "300px" }}
              />
            </Card>
            <Box paddingY={1}>
              <Typography variant="overline" paddingTop={2}>
                Deadline
              </Typography>
              <Typography variant="body1">
                {selectedBrief?.deadline} <br />
              </Typography>
            </Box>
            <Box paddingY={1}>
              <Typography variant="overline" paddingTop={2}>
                Consultation Slot
              </Typography>
              <Typography variant="body1">
                {selectedBrief?.consultation_slot} <br />
              </Typography>
            </Box>

            {selectedBrief?.status === "PENDING_RESPONSE" ? (
              <>
                <Divider></Divider>
                <Stack direction={"row"} spacing={1} paddingTop={1}>
                  {" "}
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleAcceptBrief}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleDeclineBrief}
                  >
                    Decline
                  </Button>
                </Stack>
                <Typography variant="subtitle1">
                  Once accepted, you'll initiate a new project with{" "}
                  {selectedBrief?.patron_name}{" "}
                </Typography>
              </>
            ) : (
              ""
            )}
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" onClick={handleCloseBrief}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* dialog to create project */}
        <Dialog open={openAddProjectDialog} onClose={handleCloseProjectDialog}>
          <DialogTitle>Add new project</DialogTitle>
          <Box component="form" onSubmit={handleAddProject} noValidate>
            <DialogContent>
              <Typography variant="h6">
                {selectedBrief?.product_name} for {selectedBrief?.patron_name}
              </Typography>
              <Typography variant="subtitle1" paddingBottom={2}>
                Budget {selectedBrief?.budget_currency}{" "}
                {selectedBrief?.budget_amount}
              </Typography>
              <TextField
                autoFocus
                margin="normal"
                fullWidth
                id="name"
                label="Project name"
                name="name"
                type="text"
                placeholder="Name your new project"
              />
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" type="submit">
                Add
              </Button>
              <Button variant="outlined" onClick={handleCloseProjectDialog}>
                Cancel
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </>
    );
};

export default CreatorRequestsSubpage;
