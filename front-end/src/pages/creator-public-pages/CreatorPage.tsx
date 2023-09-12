import React, { useState, useEffect, useRef, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { CreatorData, data } from "../../interfaces";
import CreatorProductCard from "../../components/CreatorProductCard";

import {
  Grid,
  Typography,
  Button,
  Box,
  Stack,
  Card,
  CardContent,
  CardMedia,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import CreatorProjectStagesCard from "../../components/CreatorProjectStagesCard";

const CreatorPage = () => {
  const params = useParams();
  const creatorId = params.creator_id;
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  // const creatorId = userCtx?.currentUser.creator_id;

  const [creatorData, setCreatorData] = useState<CreatorData | null>(null);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [projectStages, setProjectStages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);

  //fetch creator data  on first mount
  const getCreatorData = async () => {
    // Set isLoading to true before making the API call
    setIsLoading(true);

    try {
      const res: data = await fetchData("/api/creators/" + creatorId);
      setCreatorData(res.data.creator);
      setProducts(res.data.products);
      setPortfolioItems(res.data.portfolioItems);
      setProjectStages(res.data.projectStages);
      setTestimonials(res.data.testimonials);
      setSocialMediaLinks(res.data.socialLinks);
    } catch (error) {
      console.error(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  // const getPortfolioProjects = async () => {
  //   try {
  //     const res: data = await fetchData("/api/creators/portfolio/" + creatorId);
  //     setPortfolioItems(res.data.items);
  //   } catch (error) {
  //     console.error(JSON.stringify(error));
  //   }
  // };

  // const getProducts = async () => {
  //   try {
  //     const res: data = await fetchData("/api/creators/products/" + creatorId);
  //     setProducts(res.data.products);
  //   } catch (error) {
  //     alert(JSON.stringify(error));
  //   }
  // };

  // const getProjectStages = async () => {
  //   try {
  //     const res: data = await fetchData(
  //       "/api/creators/project_stages/" + creatorId
  //     );
  //     setProjectStages(res.data.projectStages);
  //   } catch (error) {
  //     alert(JSON.stringify(error));
  //   }
  // };

  useEffect(() => {
    getCreatorData();
    // getPortfolioProjects();
    // getProducts();
    // getProjectStages();
  }, []);

  if (isLoading) {
    return <Typography variant="body1">Loading...</Typography>;
  } else
    return (
      <>
        <Stack spacing={3} alignItems="center">
          <>
            {/* creator bio */}
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
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => navigate(`/creators/createbrief/${creatorId}`)}
                >
                  Send brief
                </Button>
                <Button variant="outlined" size="small">
                  Contact
                </Button>
              </Stack>
            </Stack>

            {/* creator gallery */}
            <Grid
              container
              display="flex"
              justifyContent="center"
              spacing={2}
              paddingTop={2}
            >
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
                    </Stack>
                  </>
                ))}
              </Stack>
            </Grid>

            {/* about */}
            <Grid container paddingY={4} display="flex" justifyContent="center">
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
                    width={200}
                  />
                ))}
              </Stack>
            </Stack>

            {/* product stages */}
            <Stack
              paddingY={4}
              display="flex"
              alignItems="center"
              spacing={2}
              width="40rem"
            >
              <Typography variant="h6" textAlign="center">
                Commissions Process
              </Typography>

              {projectStages?.map((data: any, index: number) => (
                <CreatorProjectStagesCard
                  key={index}
                  {...data}
                  cardHeight="250"
                />
              ))}
            </Stack>

            {/* testimonials */}
            <Stack paddingY={4} display="flex" alignItems="center" spacing={2}>
              <Typography variant="h6">
                Testimonials for {creatorData?.display_name}
              </Typography>
              <Card sx={{ width: 500, minHeight: 150, display: "flex" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 200 }}
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
                    <Typography component="div" variant="body1">
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
          </>
        </Stack>

        {/* footer bar */}
        <AppBar
          position="static"
          sx={{ backgroundColor: "rgba(46, 125, 50, 0.25)" }}
        >
          <Toolbar>
            <Stack>
              <Box display="flex" alignItems="center">
                <IconButton color="primary" aria-label="Instagram">
                  <InstagramIcon />
                </IconButton>
                <IconButton color="primary" aria-label="Facebook">
                  <FacebookIcon />
                </IconButton>
              </Box>
              <Typography
                variant="subtitle1"
                color="primary"
                marginLeft="auto"
                component={RouterLink}
                to="/"
                paddingLeft={1}
                paddingBottom={1}
              >
                &copy; {new Date().getFullYear()} {creatorData?.display_name}{" "}
                powered by Cocreate
              </Typography>
            </Stack>
          </Toolbar>
        </AppBar>
      </>
    );
};

export default CreatorPage;
