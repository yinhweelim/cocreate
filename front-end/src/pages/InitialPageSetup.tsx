import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Toolbar, Stack, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";

const InitialPageSetup = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <>
      {" "}
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <img src="../src/assets/logo.png" height="20"></img>
          <Stack direction="row" spacing={4}>
            <IconButton
              color="default"
              size="large"
              component={RouterLink}
              to="/"
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </Box>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h6" paddingTop={4}>
            Name your new creator page
          </Typography>
          <Typography
            component="body"
            variant="body1"
            paddingY={2}
            textAlign={"center"}
          >
            Your page name is how people will know you and search for you. You
            can always change it later.
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="display_name"
              label="Display Name"
              name="display_name"
              type="text"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="tagline"
              label="Short description"
              type="text"
              id="tagline"
              helperText="Share some details about yourself or your brand."
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/home" variant="body2">
                  {"Skip for now"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default InitialPageSetup;
