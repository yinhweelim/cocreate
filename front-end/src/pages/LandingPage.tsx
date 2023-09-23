import {
  Box,
  Typography,
  Stack,
  Button,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";
import { Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const LandingPage = () => {

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <img src="../src/assets/logo.png" height="20"></img>
          <Stack direction="row" spacing={4}>
            <Button color="primary" component={Link} to="/sign-in">
              Login
            </Button>
          </Stack>
        </Toolbar>
      </Box>

      <Box justifySelf={"centre"} maxWidth={"1000px"} marginX={"auto"}>
        <Stack>
          <Typography
            variant="h2"
            component="h1"
            textAlign={"center"}
            paddingY={2}
          >
            Start and grow your custom commissions business
          </Typography>

          <Typography variant="body1" textAlign={"center"}>
            Cocreate is the best place for creators to showcase work, connect
            with collectors and grow their business.
          </Typography>
          <Typography variant="body1" textAlign={"center"}>
            Focus on the creative process and simplify the rest.
          </Typography>

          <Stack
            direction={"row"}
            justifyContent={"center"}
            padding={2}
            spacing={2}
          >
            <Button variant="contained" component={Link} to="/registration">
              Sign up
            </Button>
          </Stack>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 1, md: 2 }}
            paddingY={2}
          >
            <Grid item xs={2}>
              <Card>
                <CardMedia
                  component="img"
                  style={{ width: "100%", height: "12rem" }}
                  image="../src/assets/landingpage/1.jpg"
                />
              </Card>
            </Grid>
            <Grid item xs={2}>
              <Card>
                <CardMedia
                  component="img"
                  style={{ width: "100%", height: "12rem" }}
                  image="../src/assets/landingpage/7.jpg"
                />
              </Card>
            </Grid>
            <Grid item xs={2}>
              <Card>
                <CardMedia
                  component="img"
                  style={{ width: "100%", height: "12rem" }}
                  image="../src/assets/landingpage/3.jpg"
                />
              </Card>
            </Grid>
            <Grid item xs={2}>
              <Card>
                <CardMedia
                  component="img"
                  style={{ width: "100%", height: "12rem" }}
                  image="../src/assets/landingpage/4.jpg"
                />
              </Card>
            </Grid>
            <Grid item xs={2}>
              <Card>
                <CardMedia
                  component="img"
                  style={{ width: "100%", height: "12rem" }}
                  image="../src/assets/landingpage/8.jpg"
                />
              </Card>
            </Grid>
            <Grid item xs={2}>
              <Card>
                <CardMedia
                  component="img"
                  style={{ width: "100%", height: "12rem" }}
                  image="../src/assets/landingpage/9.jpg"
                />
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardMedia
                  component="img"
                  style={{ width: "100%", height: "15rem" }}
                  image="../src/assets/landingpage/6.jpg"
                />
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardMedia
                  component="img"
                  style={{ width: "100%", height: "15rem" }}
                  image="../src/assets/landingpage/2.jpg"
                />
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </div>
  );
};

export default LandingPage;
