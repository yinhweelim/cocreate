import React, { useState, useEffect, useRef, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { CreatorData, data } from "../../interfaces";
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
  Snackbar,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddAPhoto from "@mui/icons-material/AddAPhoto";
import { JSX } from "react/jsx-runtime";
import BriefProductOption from "../../components/BriefProductOption";

const CreateBrief = () => {
  const params = useParams();
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const fetchData = useFetch();
  const [isLoading, setIsLoading] = useState(true);
  const [creatorData, setCreatorData] = useState<CreatorData | null>(null);
  const [products, setProducts] = useState([]);

  // brief variables
  const [refImage, setRefImage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState<String | null>(null);
  const creatorId = params.creator_id;
  // Find the signed-in user id with role === 'PATRON'
  const patronUser = userCtx?.userArray.find(
    (item: any) => item.role === "PATRON"
  );
  const patronId = patronUser ? patronUser.user_id : null;
  // const deadlineRef = useRef<HTMLInputElement | null>(null);
  // const consultationSlotRef = useRef<HTMLInputElement | null>(null);
  const [deadline, setDeadline] = useState<Dayjs | null>(
    dayjs().add(4, "week")
  );
  const [consultationTimeslot, setConsultationTimeslot] =
    useState<Dayjs | null>(dayjs().add(5, "day"));

  //fetch creator data and products on first mount
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

  const handleAddBrief = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedProduct) {
      console.log("option not selected");
      showSnackbar("Please select a product", "warning");
      return;
    }

    //construct request body
    const submittedData = new FormData(event.currentTarget);
    const budget: number =
      parseInt(submittedData.get("budget") as string, 10) || 0;
    const details: string = (submittedData.get("description") as string) || "";

    //append image and body to formData
    const formData = new FormData();
    if (refImage) {
      formData.append("image", refImage);
    }
    formData.append("creator_id", creatorId as string);
    formData.append("patron_id", patronId as string);
    formData.append("product_id", selectedProduct as string);
    formData.append("details", details);
    formData.append("budget_amount", budget.toString());
    formData.append(
      "delivery_method",
      submittedData.get("deliveryMethod") as string
    );

    console.log(formData);
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/api/projects/briefs/",
      {
        method: "PUT",
        headers: {},
        body: formData,
      }
    );
    const data: any = await res.json();

    let returnValue = {};
    if (res.ok) {
      if (data.status === "error") {
        returnValue = { ok: false, data: data.msg };
        showSnackbar("Failed to add product", "warning");
      } else {
        userCtx?.setCurrentUser(patronUser);
        returnValue = { ok: true, data };
        showSnackbar("Product added successfully", "success");
        navigate("/dashboard/commissions");
      }
    } else {
      if (data?.errors && Array.isArray(data.errors)) {
        const messages = data.errors.map((item: any) => item.msg);
        returnValue = { ok: false, data: messages };
      } else if (data?.status === "error") {
        returnValue = { ok: false, data: data.message || data.msg };
      } else {
        console.log(data);
        console.log("error");
        returnValue = { ok: false, data: "An error has occurred" };
      }
      console.error(returnValue);
    }
  };

  //snackbar state variables
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "warning"
  >("success");

  //snackbar functions
  const showSnackbar = (message: string, severity: "success" | "warning") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

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
                  sx={{ margin: "normal", width: "32rem" }}
                  id="budget"
                  label="Budget"
                  name="budget"
                  type="number"
                  placeholder="Add your budget"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
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
                      name="deliveryMethod"
                      sx={{ margin: "normal", width: "32rem" }}
                      {...params}
                      label="Delivery Method"
                    />
                  )}
                />

                <DatePicker
                  disabled
                  label="Deadline"
                  sx={{ margin: "normal", width: "32rem" }}
                  value={deadline}
                  minDate={dayjs().add(4, "week")}
                  onChange={(newDate) => setDeadline(newDate)}
                ></DatePicker>

                <DateTimePicker
                  disabled
                  label="Consultation timeslot"
                  slotProps={{
                    textField: {
                      helperText:
                        "Pick a timeslot for a potential consultation. Subject to creator's availability",
                    },
                  }}
                  sx={{ margin: "normal", width: "32rem" }}
                  value={consultationTimeslot}
                  onChange={(newDate) => setConsultationTimeslot(newDate)}
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

            {/* Snackbar */}

            <Stack spacing={2} sx={{ width: "100%" }}>
              <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity={snackbarSeverity}
                  sx={{ width: "100%" }}
                >
                  {snackbarMessage}
                </Alert>
              </Snackbar>
            </Stack>
          </Container>
        </LocalizationProvider>
      </>
    );
};

export default CreateBrief;
