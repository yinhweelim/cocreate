import { useContext, useState, useEffect } from "react";
import UserContext from "../../context/UserContext";
import useFetch from "../../hooks/useFetch";
import { Brief, data, Project } from "../../interfaces";

//components
import { Grid, Button, Divider, Stack, Badge, Typography } from "@mui/material";
import SectionHeading from "../../components/SectionHeading";
import CreatorProjectsSubpage from "./CreatorProjectsSubpage";
import CreatorRequestsSubpage from "./CreatorRequestsSubpage";

const CreatorProjects = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  //project variables
  const creatorId: string = userCtx?.currentUser.creator_id;
  const [projects, setProjects] = useState<Project[]>([]);
  const [briefs, setBriefs] = useState<Brief[]>([]);

  //subpage handling
  const [selectedSubpage, setSelectedSubpage] = useState<String>("projects");
  const handleSubpageChange = (subpage: String) => {
    setSelectedSubpage(subpage);
  };

  //get briefs
  const getBriefs = async () => {
    // Set isLoading to true before making the API call
    setIsLoading(true);

    try {
      const res: data = await fetchData(
        "/api/projects/briefs/creators/" + creatorId,
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
        "/api/projects/creators/" + creatorId,
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
  }, [creatorId]);

  const pendingRequests = briefs?.filter(
    (brief: Brief) => brief.status === "PENDING_RESPONSE"
  );
  const pendingRequestCount = pendingRequests?.length;

  return (
    <>
      <Grid container direction="column">
        {/* header with action buttons */}
        <SectionHeading
          heading={"Projects"}
          actionButton={null}
        ></SectionHeading>
        {/* subpages */}
        <Stack direction={"row"} spacing={1}>
          <Button
            variant="text"
            onClick={() => handleSubpageChange("projects")}
          >
            Projects
          </Button>
          <Badge badgeContent={pendingRequestCount} color="primary">
            <Button
              variant="text"
              onClick={() => handleSubpageChange("requests")}
            >
              Requests
            </Button>
          </Badge>
        </Stack>
        <Divider />
        {/* page content */}
        {isLoading ? (
          <Typography variant="body1">Loading...</Typography>
        ) : (
          <Grid container padding={1}>
            {selectedSubpage === "projects" ? (
              <CreatorProjectsSubpage
                projects={projects}
                setProjects={setProjects}
              />
            ) : (
              <CreatorRequestsSubpage
                briefs={briefs}
                setBriefs={setBriefs}
                getBriefs={getBriefs}
              />
            )}
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default CreatorProjects;
