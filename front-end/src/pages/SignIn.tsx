import React from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import { data } from "../interfaces";
import useFetch from "../hooks/useFetch";
import jwtDecode from "jwt-decode";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Toolbar, Stack, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Cocreate
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function SignIn() {
  const fetchData = useFetch();
  const userCtx = React.useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const res: data = await fetchData("/api/auth/login", "POST", {
      email,
      password,
    });
    if (res.ok) {
      userCtx?.setAccessToken(res.data?.access);
      userCtx?.setEmail(email);
      localStorage.setItem("accessToken", JSON.stringify(res.data.access));

      const decoded: any = jwtDecode(res.data?.access);

      userCtx?.setAuthId(decoded.id);
      localStorage.setItem("authId", JSON.stringify(decoded.id));
      localStorage.setItem("authEmail", JSON.stringify(decoded.email));

      const redirectTo = location.state?.from || "/dashboard/projects";
      navigate(redirectTo);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  return (
    <>
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSignin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
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
                <Link href="/registration" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
}
