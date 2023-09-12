import React, { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import useFetch from "../hooks/useFetch";
import { data } from "../interfaces";
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
const Settings = (props: SettingsProps) => {
  const fetchData = useFetch();
  const { showSnackbar } = useSnackbar();
  const userCtx = useContext(UserContext);
  const userData = userCtx?.currentUser;
  const userId = userData.user_id;
  const authId = userCtx?.authId;
  // user avatar
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleUpdateAvatar = async (event: any) => {
    const imageFile = event.target.files[0];
    setSelectedAvatar(imageFile);

    const formData = new FormData();
    formData.append("image", imageFile);
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/api/users/avatars/" + userId,
      {
        method: "PATCH",
        headers: {},
        body: formData,
      }
    );
    const data: any = await res.json();

    let returnValue = {};
    if (res.ok) {
      if (data.status === "error") {
        returnValue = { ok: false, data: data.msg };
        showSnackbar("Avatar update failed", "warning");
      } else {
        returnValue = { ok: true, data };
        showSnackbar("Avatar updated successfully", "success");
        props.getUserInfo();
      }
    } else {
      if (data?.errors && Array.isArray(data.errors)) {
        const messages = data.errors.map((item: any) => item.msg);
        returnValue = { ok: false, data: messages };
        console.error(returnValue);
      } else if (data?.status === "error") {
        returnValue = { ok: false, data: data.message || data.msg };
        console.error(returnValue);
      } else {
        console.log(data);
        returnValue = { ok: false, data: "An error has occurred" };
        console.error(returnValue);
      }
    }
  };

  //update creator data
  const handleUpdateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    interface UpdateProfileRequestBody {
      given_name?: string | null;
      last_name?: string | null;
      country_of_residence?: string | null;
    }
    const given_name = data.get("given_name");
    const last_name = data.get("last_name");
    const country_of_residence = data.get("country");

    const requestBody: UpdateProfileRequestBody = {
      given_name,
      last_name,
      country_of_residence:
        typeof country_of_residence === "string" ? country_of_residence : null,
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
                  <Stack direction={"row"} alignItems={"center"} spacing={2}>
                    {selectedAvatar ? (
                      <Avatar
                        alt="avatar"
                        src={URL.createObjectURL(selectedAvatar)}
                        sx={{ width: 56, height: 56 }}
                      />
                    ) : (
                      <>
                        {userData?.avatar_image_url ? (
                          <Avatar
                            alt="avatar"
                            src={userData?.avatar_image_url}
                            sx={{ width: 56, height: 56 }}
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
                        Update
                      </Button>
                    </label>
                  </Stack>
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
                    type="text"
                    defaultValue={userCtx?.email}
                  />

                  <TextField
                    margin="normal"
                    fullWidth
                    type="text"
                    id="given_name"
                    name="given_name"
                    label="Given Name"
                    defaultValue={userData?.given_name}
                  />

                  <TextField
                    margin="normal"
                    fullWidth
                    type="text"
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
