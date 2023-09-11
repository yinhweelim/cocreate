import { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import { Box, Grid, Button, Stack, Divider } from "@mui/material";
import SectionHeading from "../../components/SectionHeading";
import CreatorProfileSubpage from "./CreatorProfileSubpage";
import CreatorProjectConfig from "./CreatorProjectConfigSubpage";
import { useNavigate } from "react-router-dom";

const CreatorPageConfig = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const creatorId = userCtx?.currentUser.creator_id;
  const [selectedSubpage, setSelectedSubpage] =
    useState<String>("business_profile");

  const handleSubpageChange = (subpage: String) => {
    setSelectedSubpage(subpage);
  };

  return (
    <>
      <Grid container direction="column">
        {/* header with action buttons */}
        <SectionHeading
          heading={"My page"}
          actionButton={
            <Button
              variant="contained"
              onClick={() => navigate(`/creators/${creatorId}`)}
            >
              View Page
            </Button>
          }
        ></SectionHeading>

        {/* subpages */}
        <Stack direction={"row"} spacing={1}>
          <Button
            variant="text"
            onClick={() => handleSubpageChange("business_profile")}
          >
            Business Profile
          </Button>
          <Button
            variant="text"
            onClick={() => handleSubpageChange("project_settings")}
          >
            Project Settings
          </Button>
        </Stack>

        <Divider />

        {/* page content */}

        {selectedSubpage === "business_profile" ? (
          <CreatorProfileSubpage />
        ) : (
          <CreatorProjectConfig />
        )}
      </Grid>
    </>
  );
};

export default CreatorPageConfig;
