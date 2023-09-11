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
  CardContent,
  CardMedia,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

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
            <Grid item xs={8}>
              <Typography variant="body1">{creatorData?.about}</Typography>
            </Grid>
          </Grid>
          {/* creator products */}
          <Stack
            paddingY={4}
            display="flex"
            justifyContent="center"
            spacing={2}
            sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}
          >
            <Typography variant="h6" textAlign="center">
              Create bespoke work with {creatorData?.display_name}
            </Typography>
            <Typography variant="overline" textAlign="center">
              {creatorData?.lead_time_in_weeks} weeks lead time |{" "}
              {creatorData?.slots_per_month} slots per month
            </Typography>
            <Typography variant="h6" textAlign="center">
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
          {/* product stages */}
          <Stack
            paddingY={4}
            display="flex"
            justifyContent="center"
            spacing={2}
          >
            <Typography variant="h6" textAlign="center">
              Commissions Process
            </Typography>
            <Stack direction={"column"} spacing={1} justifyContent="center">
              {["Stage 1", "Stage 2", "Stage 3"].map(
                (data: any, index: number) => (
                  <Typography textAlign="center">{data}</Typography>
                )
              )}
            </Stack>
          </Stack>
          {/* TODO: add testimonials */}

          <Stack paddingY={4} display="flex" alignItems="center" spacing={2}>
            <Typography variant="h6">
              Testimonials for {creatorData?.display_name}
            </Typography>
            <Card sx={{ width: 500, minHeight: 200, display: "flex" }}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image="/static/images/cards/live-from-space.jpg"
                alt="Testimonial product image"
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  width: "100%",
                }}
              >
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="Body1">
                    Testimonial
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Client name
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Stack>
        </Stack>

        {/* footer bar */}
        <AppBar
          position="static"
          sx={{ backgroundColor: "rgba(46, 125, 50, 0.25)" }}
        >
          <Toolbar>
            <Box display="flex" alignItems="center">
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" color="primary" marginLeft="auto">
              &copy; {new Date().getFullYear()} {creatorData?.display_name}{" "}
              powered by Cocreate
            </Typography>
          </Toolbar>
        </AppBar>
      </>
    );
};

export default CreatorPage;
