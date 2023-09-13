import React, { useContext, useState, useEffect } from "react";
import { useSnackbar } from "../../context/SnackbarContext";
import UserContext from "../../context/UserContext";
import useFetch from "../../hooks/useFetch";
import { data, Brief } from "../../interfaces";

//components
import { Box, Grid, Button, Divider, Stack } from "@mui/material";
import SectionHeading from "../../components/SectionHeading";
import CreatorProjectsSubpage from "./CreatorProjectsSubpage";
import CreatorRequestsSubpage from "./CreatorRequestsSubpage";

const CreatorProjects = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSnackbar } = useSnackbar();
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  //project variables
  const creatorId: string = userCtx?.currentUser.creator_id;
  const [projects, setProjects] = useState([]);
  const [briefs, setBriefs] = useState([]);

  //subpage handling
  const [selectedSubpage, setSelectedSubpage] = useState<String>("projects");
  const handleSubpageChange = (subpage: String) => {
    setSelectedSubpage(subpage);
  };

  //get briefs

  //fetch briefs
  const getBriefs = async () => {
    // Set isLoading to true before making the API call
    setIsLoading(true);

    try {
      const res: data = await fetchData(
        "/api/projects/briefs/creators/" + creatorId
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
    console.log("got projects");
  };

  useEffect(() => {
    getBriefs();
    getProjects();
  }, []);

  return (
    <>
      <Grid container direction="column">
        {/* header with action buttons */}
        <SectionHeading
          heading={"Projects"}
          // actionButton={<Button variant="contained">Create Project</Button>}
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
          <Button
            variant="text"
            onClick={() => handleSubpageChange("requests")}
          >
            Requests
          </Button>
        </Stack>

        <Divider />

        {/* page content */}
        <Grid container padding={1}>
          {selectedSubpage === "projects" ? (
            <CreatorProjectsSubpage
              isLoading={isLoading}
              // projects={projects}
              setProjects={setProjects}
            />
          ) : (
            <CreatorRequestsSubpage
              isLoading={isLoading}
              briefs={briefs}
              setBriefs={setBriefs}
              getBriefs={getBriefs}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default CreatorProjects;
