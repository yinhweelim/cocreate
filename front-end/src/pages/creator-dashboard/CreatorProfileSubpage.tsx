import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";

const CreatorProfile = () => {
  const [country, setCountry] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // const email = data.get("email");
    // const password = data.get("password");
    // console.log({
    //   email,
    //   password,
    // });
    // const res: data = await fetchData("/api/auth/login", "POST", {
    //   email,
    //   password,
    // });
    // if (res.ok) {
    //   userCtx?.setAccessToken(res.data?.access);
    //   localStorage.setItem("accessToken", JSON.stringify(res.data.access));

    //   const decoded: any = jwtDecode(res.data?.access);
    //   console.log(decoded);
    //   userCtx?.setAuthId(decoded.id);
    //   localStorage.setItem("authId", JSON.stringify(decoded.id));
    //   localStorage.setItem("authEmail", JSON.stringify(decoded.email));

    //   navigate(`/projects`);
    // } else {
    //   alert(JSON.stringify(res.data));
    // }

    const setCountry = () => {};
  };
  return (
    <>
      <Grid container paddingTop={2}>
        <Grid item xs={9}>
          {/* Profile */}
          <Paper variant="outlined" elevation={2}>
            <Typography variant="h6" component="h4" padding={2}>
              Profile
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
              paddingX={2}
            >
              <TextField
                margin="normal"
                fullWidth
                id="pageName"
                label="Page Name"
                name="pageName"
                autoFocus
              />

              <TextField
                margin="normal"
                fullWidth
                id="tagline"
                label="Short Bio"
                name="shortBio"
                autoFocus
              />

              <TextField
                margin="normal"
                multiline
                fullWidth
                id="about"
                label="About"
                name="About"
                autoFocus
              />

              <Autocomplete
                disablePortal
                options={["Singapore", "USA"]}
                inputValue={country}
                onInputChange={(event, newInputValue) => {
                  setCountry(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    margin="normal"
                    {...params}
                    label="Country of Operation"
                  />
                )}
              />

              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Update
              </Button>
            </Box>
          </Paper>

          {/* Gallery image upload */}
          <Paper variant="outlined" elevation={2}>
            <Typography variant="h6" component="h4" padding={2}>
              Gallery images
            </Typography>
            <Typography variant="body1" component="body" padding={2}>
              Upload up to 6 images
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
              paddingX={2}
            >
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Save
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default CreatorProfile;
