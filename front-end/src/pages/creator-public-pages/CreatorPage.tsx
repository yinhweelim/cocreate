import React, { useState, useEffect, useRef, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { CreatorData, data } from "../../interfaces";

import { Grid, Typography, Button, Box, Stack } from "@mui/material";

const CreatorPage = () => {
  const params = useParams();
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const creatorId = userCtx?.currentUser.creator_id;

  const [creatorData, setCreatorData] = useState<CreatorData | null>(null);
  const [portfolioItems, setPortfolioItems] = useState([]);

  //fetch creator data and portfolio projects on first mount
  const getCreatorData = async () => {
    // Set isLoading to true before making the API call
    setIsLoading(true);

    try {
      const res: data = await fetchData("/api/creators/" + creatorId);
      setCreatorData(res.data.creator);
    } catch (error) {
      console.error(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  const getPortfolioProjects = async () => {
    try {
      const res: data = await fetchData("/api/creators/portfolio/" + creatorId);
      setPortfolioItems(res.data.items);
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };

  useEffect(() => {
    getCreatorData();
    getPortfolioProjects();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } else
    return (
      <>
        <Grid container spacing={2} display="flex" justifyContent="center">
          {/* logo */}
          <Grid
            container
            item
            xs={12}
            paddingY={4}
            display="flex"
            justifyContent="center"
          >
            <img src={creatorData?.logo_image_url} />
          </Grid>
          {/* creator bio */}
          <Grid item xs={12} paddingY={4}>
            <Stack>
              <Typography variant="overline">{creatorData?.tagline}</Typography>
              <Typography variant="overline">
                {creatorData?.country_of_operation}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={2}>
              <Button variant="contained">Send brief</Button>
              <Button variant="outlined">Contact</Button>
            </Stack>
          </Grid>
          {/* creator gallery */}
          <Grid item xs={12}>
            Gallery
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">{creatorData?.about}</Typography>
          </Grid>
        </Grid>
      </>
    );
};

export default CreatorPage;
