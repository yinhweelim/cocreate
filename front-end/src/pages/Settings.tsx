import React, { useState, useContext, useRef } from "react";
import UserContext from "../context/UserContext";
import useFetch from "../hooks/useFetch";
import {
  Box,
  Grid,
  Button,
  Divider,
  Stack,
  Autocomplete,
  Card,
  CardContent,
  CardMedia,
  Paper,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import AddAPhoto from "@mui/icons-material/AddAPhoto";
import SectionHeading from "../components/SectionHeading";
import { useSnackbar } from "../context/SnackbarContext";

interface SettingsProps {
  getUserInfo: () => Promise<void>;
}
const Settings = (props) => {
  const fetchData = useFetch();
  const { showSnackbar } = useSnackbar();
  const userCtx = useContext(UserContext);
  const userData = userCtx.currentUser;
  const userId = userData.user_id;
  const authId = userCtx?.authId;
  // user avatar
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleUpdateAvatar = () => {};

  //update creator data
  const handleUpdateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    interface UpdateProfileRequestBody {
      given_name?: string | null;
      last_name?: string | null;
      country?: string | null;
    }
    const given_name = data.get("display_name");
    const last_name = data.get("last_name");
    const country_of_residence = data.get("country");

    const requestBody: UpdateProfileRequestBody = {
      given_name,
      last_name,
      country_of_residence,
    };

    const res: data = await fetchData(
      "/api/users/" + userId,
      "PATCH",
      requestBody
    );
    if (res.ok) {
      showSnackbar("User updated successfully", "success");
      props.getUserInfo();
    } else {
      console.log(JSON.stringify(res.data));
      showSnackbar("User update failed", "warning");
    }
  };

  return (
    <>
      <Grid container direction="column">
        {/* header with action buttons */}
        <SectionHeading
          heading={"Settings"}
          actionButton={null}
        ></SectionHeading>

        <Divider />
        {JSON.stringify(userData)}
        {/* page content */}
        <Grid container paddingY={4}>
          <Grid container rowSpacing={2}>
            {/* Profile */}
            <Grid item xs={9}>
              <Paper variant="outlined">
                <Typography variant="h6" component="h4" padding={2}>
                  Profile
                </Typography>

                {/* //logo upload and preview */}
                <Box paddingX={2}>
                  {selectedAvatar ? (
                    <Avatar
                      alt="Selected"
                      src={URL.createObjectURL(selectedAvatar)}
                      sx={{ maxHeight: "100px", maxWidth: "300px" }}
                    />
                  ) : (
                    <>
                      {userData?.avatar_image_url ? (
                        <Avatar
                          alt="Logo"
                          src={userData?.avatar_image_url}
                          sx={{ maxHeight: "100px", maxWidth: "300px" }}
                        />
                      ) : (
                        <Avatar></Avatar>
                      )}
                    </>
                  )}

                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="image-upload-button"
                    type="file"
                    onChange={handleUpdateAvatar}
                  />
                  <label htmlFor="image-upload-button">
                    <Button
                      variant="outlined"
                      component="span"
                      color="primary"
                      size="small"
                      startIcon={<AddAPhoto></AddAPhoto>}
                    >
                      Upload Avatar
                    </Button>
                  </label>
                </Box>
                <Box
                  component="form"
                  onSubmit={handleUpdateUser}
                  noValidate
                  sx={{ mt: 1 }}
                  paddingX={2}
                >
                  <TextField
                    disabled
                    margin="normal"
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    defaultValue={userCtx?.email}
                  />

                  <TextField
                    margin="normal"
                    fullWidth
                    id="given_name"
                    name="given_name"
                    label="Given Name"
                    defaultValue={userData?.given_name}
                  />

                  <TextField
                    margin="normal"
                    fullWidth
                    id="last_name"
                    name="last_name"
                    label="Last Name"
                    defaultValue={userData?.last_name}
                  />

                  <Autocomplete
                    disablePortal
                    options={["SINGAPORE", "UNITED STATES"]}
                    defaultValue={userData?.country_of_residence}
                    renderInput={(params) => (
                      <TextField
                        name="country"
                        margin="normal"
                        {...params}
                        label="Country of residence"
                      />
                    )}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Update
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Settings;
