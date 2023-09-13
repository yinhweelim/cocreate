import { useState, useEffect } from "react";
import { Container, Stack, Box, Typography, IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import SectionSubpages from "../../components/SectionSubpages";
import CloseIcon from "@mui/icons-material/Close";
import useFetch from "../../hooks/useFetch";
import { data, Project, CreatorData, Brief } from "../../interfaces";

const ProjectTracker = () => {
  const params = useParams();
  const fetchData = useFetch();
  const [isLoading, setIsLoading] = useState(true);

  //project variables
  const projectId = params.project_id;
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [briefData, setBriefData] = useState<Brief | null>(null);
  const [productData, setProductData] = useState(null);
  const [stages, setStages] = useState([]);
  const [proposalData, setProposalData] = useState([]);
  const [creatorData, setCreatorData] = useState<CreatorData | null>([]);

  //fetch project data  on first mount
  const getProjectData = async () => {
    // Set isLoading to true before making the API call
    setIsLoading(true);

    try {
      const res: data = await fetchData("/api/projects/" + projectId);
      setProjectData(res.data.product);
      setBriefData(res.data.brief);
      setProductData(res.data.product);
      setStages(res.data.stages);
      setProposalData(res.data.proposals);
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };

  const getCreatorData = async () => {
    // Set isLoading to true before making the API call
    try {
      const res: data = await fetchData(
        "/api/creators/" + projectData?.creator_id
      );
      setCreatorData(res.data.creator);
    } catch (error) {
      console.error(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProjectData();
  }, []);

  useEffect(() => {
    // Fetch creator data when projectData is set
    if (projectData) {
      getCreatorData();
    }
  }, [projectData]);

  if (isLoading) {
    return <Typography variant="body1">Loading...</Typography>;
  } else
    return (
      <>
        <Container maxWidth="md">
          <Stack spacing={3}>
            {JSON.stringify(projectData)}
            {/* logo */}
            <Stack paddingTop={4} display="flex" justifyContent="centre">
              <Box alignSelf="center">
                <img src={creatorData?.logo_image_url} alt="creator logo" />
              </Box>
              <Stack direction="row" spacing={4} justifyContent="space-between">
                <Typography variant="h5" textAlign="left" paddingTop={2}>
                  {projectData?.name} for {projectData?.patron_name}
                </Typography>
                <IconButton
                  color="default"
                  size="small"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Stack>
              <Box>
                <Typography variant="overline" textAlign="left" paddingTop={2}>
                  TEXT
                </Typography>
                <Typography variant="body1" textAlign="left" paddingTop={2}>
                  TEXT
                </Typography>
              </Box>
            </Stack>
            <SectionSubpages
              actionButton={undefined}
              heading={undefined}
            ></SectionSubpages>
          </Stack>

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
