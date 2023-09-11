import React, { useState, useEffect, useRef, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { CreatorData, data } from "../../interfaces";
import CreatorProductCard from "../../components/CreatorProductCard";

import {
  Grid,
  Typography,
  Button,
  Box,
  Stack,
  Paper,
  Card,
  CardMedia,
} from "@mui/material";
import CreatorPortfolioCard from "../../components/CreatorPortfolioCard";

const CreatorPage = () => {
  const params = useParams();
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const creatorId = userCtx?.currentUser.creator_id;

  const [creatorData, setCreatorData] = useState<CreatorData | null>(null);
  const [portfolioItems, setPortfolioItems] = useState([]);
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

  const getPortfolioProjects = async () => {
    try {
      const res: data = await fetchData("/api/creators/portfolio/" + creatorId);
      setPortfolioItems(res.data.items);
    } catch (error) {
      console.error(JSON.stringify(error));
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
    getPortfolioProjects();
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

            <Typography variant="overline" textAlign="center" paddingTop={2}>
              {creatorData?.tagline} <br />
              {creatorData?.country_of_operation}
            </Typography>
            <Stack
              direction={"row"}
              spacing={2}
              paddingTop={1}
              justifyContent={"center"}
            >
              <Button variant="contained" size="small">
                Send brief
              </Button>
              <Button variant="outlined" size="small">
                Contact
              </Button>
            </Stack>
          </Stack>

          {/* creator gallery */}
          <Grid container display="flex" justifyContent="center" spacing={2}>
            <Stack direction={"row"} spacing={1}>
              {portfolioItems?.map((data: any, index: number) => (
                <>
                  <Stack>
                    <Card>
                      <CardMedia
                        sx={{
                          height: 200,
                          width: 200,
                          padding: "1em 1em 0 1em",
                          objectFit: "cover",
                        }}
                        image={data.image_url || undefined}
                        title="Portfolio Image"
                      />
                    </Card>

                    {/* <Typography variant="subtitle2" textAlign="center">
                      {data.title}
                    </Typography>
                    <Typography variant="subtitle1" textAlign="center">
                      {data.caption}
                    </Typography> */}
                  </Stack>
                </>
                //   <CreatorPortfolioCard
                //     key={index}
                //     {...data}
                //     onDelete={null}
                //     deleteDisplayConfig="none"
                //     cardHeight={250}
                //   />
              ))}
            </Stack>
          </Grid>

          {/* about */}
          <Grid container paddingTop={4} display="flex" justifyContent="center">
            <Grid item xs={9}>
              <Typography variant="body1">{creatorData?.about}</Typography>
            </Grid>
          </Grid>

          {/* creator products */}
          <Stack
            paddingTop={4}
            display="flex"
            justifyContent="center"
            spacing={2}
            sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}
          >
            <Typography variant="h5" textAlign="center">
              Create bespoke work with {creatorData?.display_name}
            </Typography>
            <Typography variant="overline" textAlign="center">
              {creatorData?.lead_time_in_weeks} weeks lead time |{" "}
              {creatorData?.slots_per_month} slots per month
            </Typography>
            <Typography variant="h5" textAlign="center">
              Options
            </Typography>
            <Stack direction={"row"} spacing={1} justifyContent="center">
              {products?.map((data: any, index: number) => (
                <CreatorProductCard
                  key={index}
                  {...data}
                  displayDelete={false}
                  onDelete={null}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </>
    );
};

export default CreatorPage;
