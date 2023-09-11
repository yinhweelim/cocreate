import React, { useState, useEffect, useRef, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { CreatorData, data } from "../../interfaces";
import CreatorProductCard from "../../components/CreatorProductCard";

import { Stack, Box, Typography, Button, Grid } from "@mui/material";

const CreateBrief = () => {
  const params = useParams();
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const creatorId = userCtx?.currentUser.creator_id;

  const [creatorData, setCreatorData] = useState<CreatorData | null>(null);
  const [products, setProducts] = useState([]);

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

  const getProducts = async () => {
    try {
      const res: data = await fetchData("/api/creators/products/" + creatorId);
      console.log("got products");
      setProducts(res.data.products);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  useEffect(() => {
    getCreatorData();
    getProducts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } else
    return (
      <>
        <Stack spacing={3}>
          {/* logo */}
          <Stack paddingTop={4} display="flex" justifyContent="center">
            <Box alignSelf="center">
              <img src={creatorData?.logo_image_url} alt="creator logo" />
            </Box>

            <Typography variant="h5" textAlign="center" paddingTop={2}>
              Let the magic begin...
            </Typography>

            <Typography variant="overline" textAlign="center" paddingTop={2}>
              Create brief for {creatorData?.display_name} <br />
            </Typography>
          </Stack>

          {/* option */}
          <Grid container paddingTop={4} display="flex" justifyContent="center">
            <Grid item xs={8}>
              <Typography variant="overline">Pick an option</Typography>
            </Grid>
          </Grid>
        </Stack>
      </>
    );
};

export default CreateBrief;
