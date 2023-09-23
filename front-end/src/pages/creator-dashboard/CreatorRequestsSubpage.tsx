import React, { useState, useEffect, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { data, Brief } from "../../interfaces";
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
  Button,
  TextField,
  DialogActions,
  Chip,
} from "@mui/material";
import CreatorBriefCard from "../../components/CreatorBriefCard";
import { useSnackbar } from "../../context/SnackbarContext";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UserContext from "../../context/UserContext";
import BriefDetails from "../../components/BriefDetails";

interface SubpageProps {
  briefs: Brief[];
  setBriefs: React.Dispatch<React.SetStateAction<Brief[]>>;
  getBriefs: () => Promise<void>;
}

const CreatorRequestsSubpage = (props: SubpageProps) => {
  const navigate = useNavigate();
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const { showSnackbar } = useSnackbar();
  const [openBrief, setOpenBrief] = useState(false); //dialog to manage brief
  const [openAddProjectDialog, setOpenAddProjectDialog] = useState(false); //dialog to manage project
  const [selectedBrief, setSelectedBrief] = useState<Brief | null>(null); // selected brief for update
  const [pendingBriefs, setPendingBriefs] = useState<Brief[] | null>([]);

  useEffect(() => {
    if (props.briefs) {
      // Separate briefs into pending and all requests
      const pendingBriefs: Brief[] = props.briefs.filter(
        (brief) => brief.status === "PENDING_RESPONSE"
      );
      setPendingBriefs(pendingBriefs);
    }
  }, [props.briefs]);

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
      userCtx?.accessToken
    );

    if (res.ok) {
      // props.getBriefs();
      setOpenBrief(false);
      setOpenAddProjectDialog(true);
      showSnackbar("Brief accepted", "success");
    } else {
      console.log(JSON.stringify(res.data));
      showSnackbar("Failed to accept brief", "warning");
      setOpenBrief(false);
    }
  };

  const handleDeclineBrief = async () => {
    const res: data = await fetchData(
      "/api/projects/briefs/" + selectedBrief?.id,
      "PATCH",
      { status: "DECLINED" },
      userCtx?.accessToken
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

    const res: data = await fetchData(
      "/api/projects",
      "PUT",
      {
        name,
        brief_id: selectedBrief?.id,
        creator_id: selectedBrief?.creator_id,
        patron_id: selectedBrief?.patron_id,
      },
      userCtx?.accessToken
    );
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

  // const handleSortNewRequestsClick = (sortField: "budget" | "createdAt") => {
  //   if (sortField === newRequestsSortBy) {
  //     // Toggle the sort order if the same field is clicked again
  //     setNewRequestsSortOrder(newRequestsSortOrder === "asc" ? "desc" : "asc");
  //   } else {
  //     // Set the new sorting field
  //     setNewRequestsSortBy(sortField);
  //     setNewRequestsSortOrder("asc");
  //   }
  // };

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

  return (
    <>
      {/* page content */}
      <Grid container paddingY={4}>
        <Grid container flexDirection="column" rowSpacing={2}>
          <Stack paddingLeft={2} paddingBottom={4}>
            <Typography variant="overline" paddingTop={1} fontSize="1rem">
              New briefs
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
              {/* Filter and sort pending briefs */}
              {pendingBriefs && pendingBriefs
                .filter((brief) => brief.status === "PENDING_RESPONSE")
                .sort((a, b) => {
                  if (newRequestsSortBy === "budget") {
                    return newRequestsSortOrder === "asc"
                      ? a.budget_amount - b.budget_amount
                      : b.budget_amount - a.budget_amount;
                  } else if (newRequestsSortBy === "createdAt") {
                    const dateA = new Date(a.created_at).getTime();
                    const dateB = new Date(b.created_at).getTime();
                    return newRequestsSortOrder === "asc"
                      ? dateA - dateB
                      : dateB - dateA;
                  }
                  return 0;
                })
                .map((data: any, index: number) => (
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
              All briefs
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
            {props.briefs?.length == 0 ? (
              <Typography variant="body1">
                No new briefs yet. Go out and get some!
              </Typography>
            ) : (
              ""
            )}
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
          <BriefDetails brief={selectedBrief}></BriefDetails>

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
