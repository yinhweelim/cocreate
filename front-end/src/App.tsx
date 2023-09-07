import { useState } from "react";
import "./App.css";
import { theme } from "./pages/theme";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Grid,
  Paper,
  Typography,
  ThemeProvider,
  Button,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";

function App() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container maxWidth="lg">
          <Box>
            <Typography variant="h1" component="h1">
              Create on your own terms.
            </Typography>
            <Typography variant="body1">
              Start and grow your custom commissions business. Cocreate is the
              best place for creators and artists to showcase work, connect with
              collectors and grow their custom commissions business.
            </Typography>
            <Stack spacing={2} direction="row">
              <Button variant="text">Text</Button>
              <Button variant="contained">Contained</Button>
              <Button variant="outlined">Outlined</Button>
            </Stack>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={3}>
                <Item>1</Item>
              </Grid>
              <Grid item xs={3}>
                <Item>2</Item>
              </Grid>
              <Grid item xs={3}>
                <Item>3</Item>
              </Grid>
              <Grid item xs={3}>
                <Item>4</Item>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
