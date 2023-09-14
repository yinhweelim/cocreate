import { useState, useEffect, useContext } from "react";
import {
  Container,
  Stack,
  Box,
  Typography,
  IconButton,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useFetch from "../../hooks/useFetch";
import { data, Project, CreatorData, Brief } from "../../interfaces";
import ProjectDetailsSubpage from "./ProjectDetailsSubpage";
import ProjectOverviewSubpage from "./ProjectOverviewSubpage";
import ProjectUpdatesSubpage from "./ProjectUpdatesSubpage";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import UserContext from "../../context/UserContext";

const ProjectTracker = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isLoggedIn = currentPath.startsWith("/dashboard"); //check whether page is accessed via dashboard or public for conditional rendering
  const params = useParams();
  const fetchData = useFetch();
  const [isLoading, setIsLoading] = useState(true);
  const userCtx = useContext(UserContext);
  const currentUser = userCtx?.currentUser;

  //project variables
  const projectId = params.project_id;
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [briefData, setBriefData] = useState<Brief | null>(null);
  const [productData, setProductData] = useState(null);
  const [stages, setStages] = useState([]);
  const [proposalData, setProposalData] = useState([]);
  const [creatorData, setCreatorData] = useState<CreatorData | null>({});
  const [creatorId, setCreatorId] = useState<string>("");

  //subpage handling
  const [selectedSubpage, setSelectedSubpage] = useState<string>("overview");

  const handleSubpageChange = (subpage: string) => {
    setSelectedSubpage(subpage);
  };

  //fetch project data and creator data on first mount
  const getProjectData = async () => {
    // Set isLoading to true before making the API call
    setIsLoading(true);

    try {
      const res: data = await fetchData("/api/projects/" + projectId);
      setProjectData(res.data.project);
      setCreatorId(res.data.project.creator_id);

      setBriefData(res.data.brief);
      setProductData(res.data.product);
      setStages(res.data.stages);
      setProposalData(res.data.proposals);
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };

  const getCreatorData = async () => {
    try {
      const res: data = await fetchData("/api/creators/" + creatorId);
      setCreatorData(res.data.creator);
    } catch (error) {
      console.error(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProjectData();
  }, [projectId]);

  useEffect(() => {
    getCreatorData();
  }, [creatorId]);

  if (!projectData || !creatorData) {
    return <Typography variant="body1">Loading...</Typography>;
  } else
    return (
      <>
        <Container maxWidth="md">
          {/* header */}
          <Grid container direction="column">
            <Stack
              paddingTop={4}
              spacing={2}
              display="flex"
              justifyContent="centre"
            >
              <Box alignSelf="center">
                <img src={creatorData?.logo_image_url} alt="creator logo" />
              </Box>
              <Stack direction="row" spacing={4} justifyContent="space-between">
                <Typography variant="h5" textAlign="left" paddingTop={2}>
                  {projectData?.name} for {projectData?.patron_name}
                </Typography>
                {/* icon should be hidden if in public page */}

                {isLoggedIn ? (
                  <IconButton
                    color="default"
                    size="small"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                ) : (
                  ""
                )}
              </Stack>
              <Typography variant="body1" textAlign="left">
                {projectData?.current_stage}
                <br />
                Started: {projectData?.created_at}
                <br />
                {proposalData?.estimated_delivery_date}
              </Typography>
            </Stack>
          </Grid>
          {/* subpage navigation */}
          <Stack direction={"row"} spacing={1} paddingTop={2}>
            <Button
              variant="text"
              onClick={() => handleSubpageChange("overview")}
            >
              Overview
            </Button>
            <Button
              variant="text"
              onClick={() => handleSubpageChange("details")}
            >
              Details
            </Button>
            {/* <Button
              variant="text"
              onClick={() => handleSubpageChange("updates")}
            >
              Updates
            </Button> */}
          </Stack>
          <Divider />
          {/* page content */}

          {isLoading ? (
            <Typography variant="body1">Loading...</Typography>
          ) : (
            <>
              {selectedSubpage === "overview" ? (
                <ProjectOverviewSubpage
                  stages={stages}
                  currentStageId={projectData?.current_stage_id}
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                />
              ) : selectedSubpage === "details" ? (
                <ProjectDetailsSubpage
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                />
              ) : (
                <ProjectUpdatesSubpage />
              )}
            </>
          )}

          {/* Snackbar */}
          {/* 
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
        </Stack> */}
        </Container>
      </>
    );
};

export default ProjectTracker;
