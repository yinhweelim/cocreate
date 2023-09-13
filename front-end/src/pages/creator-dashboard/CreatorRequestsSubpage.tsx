import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import useFetch from "../../hooks/useFetch";
import { data, Brief } from "../../interfaces";
import { AddAPhoto } from "@mui/icons-material";
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
} from "@mui/material";
import CreatorBriefCard from "../../components/CreatorBriefCard";
import { useSnackbar } from "../../context/SnackbarContext";

interface SubpageProps {
  isLoading: boolean;
  briefs: Brief[];
  setBriefs: React.Dispatch<React.SetStateAction<never[]>>;
  getBriefs: () => Promise<void>;
}
const CreatorRequestsSubpage = (props: SubpageProps) => {
  const fetchData = useFetch();
  const [openBrief, setOpenBrief] = useState(false); //dialog to manage brief
  const { showSnackbar } = useSnackbar();
  const [selectedBrief, setSelectedBrief] = useState<Brief | null>(null); // selected brief for update
  const [selectedBriefImage, setSelectedBriefImage] = useState(null);

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

  //close dialog for brief
  const handleCloseBrief = () => {
    setOpenBrief(false);
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
                Requests
              </Typography>
              <Typography variant="body1" paddingBottom={4}>
                View and manage incoming requests. Accept a request to initiate
                a new project!
              </Typography>
              {props.briefs?.length == 0 ? (
                <Typography variant="body1">
                  No briefs yet. Go out and get some!
                </Typography>
              ) : (
                ""
              )}
              <Grid container flexDirection={"row"} spacing={1}>
                {props.briefs?.map((data: any, index: number) => (
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
      </>
    );
};

export default CreatorRequestsSubpage;
