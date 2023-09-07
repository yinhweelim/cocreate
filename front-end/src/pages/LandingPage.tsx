import React from "react";
import { Box, Typography, Stack, Button, Grid, Paper } from "@mui/material";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";

const LandingPage = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "##D9D9D9",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    height: "200px",
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <img src="../src/assets/logo.png" height="20"></img>
          <Stack direction="row" spacing={4}>
            {/* <Button color="inherit">Creators</Button>
            <Button color="inherit">Patrons</Button> */}
            <Button color="primary" component={Link} to="/sign-in">
              Login
            </Button>
          </Stack>
        </Toolbar>
      </Box>

      <Box justifySelf={"centre"} maxWidth={"800px"} marginX={"auto"}>
        <Stack>
          <Typography
            variant="h2"
            component="h1"
            textAlign={"center"}
            paddingY={4}
          >
            Start and grow your custom commissions business
          </Typography>
          <Typography variant="body1" textAlign={"center"}>
            Cocreate is the best place for creators to showcase work, connect
            with collectors and grow their custom commissions business. Focus on
            the creative process and simplify the rest.
          </Typography>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            padding={2}
            spacing={2}
          >
            <Button variant="contained">Sign up</Button>
          </Stack>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            paddingY={2}
          >
            <Grid item xs={4}>
              <Item></Item>
            </Grid>
            <Grid item xs={4}>
              <Item></Item>
            </Grid>
            <Grid item xs={4}>
              <Item></Item>
            </Grid>
            <Grid item xs={4}>
              <Item></Item>
            </Grid>
            <Grid item xs={4}>
              <Item></Item>
            </Grid>
            <Grid item xs={4}>
              <Item></Item>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </div>
  );
};

export default LandingPage;
