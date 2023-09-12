import React, { useState, useEffect, useRef, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { CreatorData, data } from "../../interfaces";
import CreatorProductCard from "../../components/CreatorProductCard";
import CloseIcon from "@mui/icons-material/Close";
import {
  Stack,
  Box,
  Typography,
  Button,
  IconButton,
  Container,
  Card,
  CardContent,
  CardMedia,
  TextField,
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextFieldVariants,
  Autocomplete,
  InputAdornment,
  setRef,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddAPhoto from "@mui/icons-material/AddAPhoto";
import { JSX } from "react/jsx-runtime";
import BriefProductOption from "../../components/BriefProductOption";
const CreateBrief = () => {
  const params = useParams();
  const navigate = useNavigate();
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const creatorId = params.creator_id;

  const [creatorData, setCreatorData] = useState<CreatorData | null>(null);
  const [products, setProducts] = useState([]);

  const [refImage, setRefImage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState<String | null>(null);

  //fetch creator data and portfolio projects on first mount
  const getCreatorData = async () => {
    // Set isLoading to true before making the API call
    setIsLoading(true);

    try {
      const res: data = await fetchData("/api/creators/" + creatorId);
      setCreatorData(res.data.creator);
      setProducts(res.data.products);
    } catch (error) {
      console.error(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCreatorData();
  }, []);

  const handleSelectProduct = (productId: String) => {
    setSelectedProduct(productId);
  };

  const handleImage = (event: any) => {
    const imageFile = event.target.files[0];
    setRefImage(imageFile);
  };

  const handleAddBrief = () => {};

  if (isLoading) {
    return <div>Loading...</div>;
  } else
    return (
      <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Container maxWidth="md">
            <Stack spacing={3}>
              {/* logo */}
              <Stack paddingTop={4} display="flex" justifyContent="centre">
                <Box alignSelf="center">
                  <img src={creatorData?.logo_image_url} alt="creator logo" />
                </Box>
                <Stack
                  direction="row"
                  spacing={4}
                  justifyContent="space-between"
                >
                  <Typography variant="h5" textAlign="left" paddingTop={2}>
                    Let the magic begin...
                  </Typography>
                  <IconButton
                    color="default"
                    size="small"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Stack>
                <Box>
                  <Typography
                    variant="overline"
                    textAlign="left"
                    paddingTop={2}
                  >
                    Brief for {creatorData?.display_name} <br />
                  </Typography>
                  <Typography variant="body1" textAlign="left" paddingTop={2}>
                    Fill {creatorData?.display_name} in on your ideas and
                    requirements
                  </Typography>
                </Box>
              </Stack>

              {/* options */}
              <Stack
                direction="column"
                display="flex"
                justifyContent="center"
                spacing={2}
              >
                <Typography variant="overline">Pick an option</Typography>

                <Stack direction="row" spacing={1} justifyContent="left">
                  {products?.map((data: any, index: number) => (
                    <BriefProductOption
                      key={index}
                      {...data}
                      width={200}
                      handleSelectProduct={handleSelectProduct}
                      className={`${
                        selectedProduct === data.id ? "selected" : ""
                      }`}
                    />
                  ))}
                </Stack>
              </Stack>

              <Stack
                spacing={2}
                component="form"
                onSubmit={handleAddBrief}
                noValidate
              >
                <Typography variant="overline">Add your brief</Typography>
                <Typography variant="body1">
                  Add specifics of what you’d like to get done.
                </Typography>
                <Typography variant="body1">
                  {creatorData?.project_description_guideline}
                </Typography>

                <TextField
                  autoFocus
                  multiline
                  minRows={2}
                  sx={{ margin: "normal", width: "32rem" }}
                  id="description"
                  label="Description"
                  name="description"
                  type="text"
                  placeholder="Add specifics of what you’d like to get done."
                />

                <TextField
                  autoFocus
                  sx={{ margin: "normal", width: "32rem" }}
                  id="budget"
                  label="Budget"
                  name="budget"
                  type="text"
                  placeholder="Add your budget"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />

                <DatePicker
                  label="Deadline"
                  autoFocus
                  sx={{ margin: "normal", width: "32rem" }}
                  defaultValue={dayjs().add(4, "week")}
                />

                <Autocomplete
                  disablePortal
                  options={["DELIVERY", "MEETUP"]}
                  renderInput={(
                    params: JSX.IntrinsicAttributes & {
                      variant?: TextFieldVariants | undefined;
                    } & Omit<
                        | FilledTextFieldProps
                        | OutlinedTextFieldProps
                        | StandardTextFieldProps,
                        "variant"
                      >
                  ) => (
                    <TextField
                      name="deliverymethod"
                      sx={{ margin: "normal", width: "32rem" }}
                      {...params}
                      label="Delivery Method"
                    />
                  )}
                />
                <DateTimePicker
                  label="Consultation timeslot"
                  slotProps={{
                    textField: {
                      helperText:
                        "Pick a timeslot for a potential consutation. Subject to creator's availability",
                    },
                  }}
                  autoFocus
                  sx={{ margin: "normal", width: "32rem" }}
                  defaultValue={dayjs().add(5, "day")}
                />

                <Typography variant="overline">Upload image</Typography>
                <Card sx={{ width: "32rem" }}>
                  {refImage ? (
                    <CardMedia
                      component="img"
                      alt="refImage"
                      src={URL.createObjectURL(refImage)}
                      sx={{ maxWidth: "300px" }}
                    />
                  ) : (
                    <CardContent>No image</CardContent>
                  )}
                </Card>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="image-upload-button"
                  type="file"
                  onChange={handleImage}
                />
                <label htmlFor="image-upload-button">
                  <Button
                    variant="outlined"
                    component="span"
                    color="primary"
                    startIcon={<AddAPhoto></AddAPhoto>}
                  >
                    Upload image
                  </Button>
                </label>

                <Stack direction={"row"} spacing={1} paddingY={2}>
                  {" "}
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Container>
        </LocalizationProvider>
      </>
    );
};

export default CreateBrief;
