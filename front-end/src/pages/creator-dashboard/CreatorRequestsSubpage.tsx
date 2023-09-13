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
import ProjectBriefCard from "../../components/PatronBriefCard";
import SectionHeading from "../../components/SectionHeading";
import { useSnackbar } from "../../context/SnackbarContext";
import CreatorBriefCard from "../../components/CreatorBriefCard";

interface SubpageProps {
  isLoading: boolean;
  briefs: Brief[];
  setBriefs: React.Dispatch<React.SetStateAction<never[]>>;
}
const CreatorRequestsSubpage = (props: SubpageProps) => {
  const [openUpdateBrief, setOpenUpdateBrief] = useState(false); //dialog to manage brief
  const [openBrief, setOpenBrief] = useState(false); //dialog to manage brief
  const [selectedBrief, setSelectedBrief] = useState<Brief | null>(null); // selected brief for update
  const [selectedBriefImage, setSelectedBriefImage] = useState(null);

  const handleAcceptBrief = () => {};
  const handleDeclineBrief = () => {};

  //close dialog to add portfolio item
  const handleCloseAddBrief = () => {
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
              {props.briefs.length == 0 ? (
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
      </>
    );
};

export default CreatorRequestsSubpage;
