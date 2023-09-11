import React, { useState, useContext, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import UserContext from "../../context/UserContext";
import { data, CreatorData } from "../../interfaces";
import { useSnackbar } from "../../context/SnackbarContext";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import {
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Autocomplete,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CreatorProductCard from "../../components/CreatorProductCard";

const CreatorProjectConfig = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const { showSnackbar } = useSnackbar();

  const [creatorData, setCreatorData] = useState<CreatorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const creatorId = userCtx?.currentUser.creator_id;

  // products state variables
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false); //dialog
  const [products, setProducts] = useState([]);
  const [selectedProductImage, setSelectedProductImage] = useState(null);

  //fetch creator data on first mount
  const getCreatorData = async () => {
    // Set isLoading to true before making the API call
    setIsLoading(true);

    try {
      const res: data = await fetchData("/api/creators/" + creatorId);
      setCreatorData(res.data.creator);
    } catch (error) {
      alert(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  const getProducts = async () => {
    try {
      const res: data = await fetchData("/api/creators/products/" + creatorId);
      console.log("got products");
      setProducts(res.data.products);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  useEffect(() => {
    getCreatorData();
    getProducts();
  }, []);

  //update profile data
  const handleUpdateProfile = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    interface UpdateProfileRequestBody {
      project_description_guideline?: string | null;
      payment_instructions?: string | null;
      lead_time_in_weeks?: number | null;
      slots_per_month?: number | null;
    }

    const requestBody: UpdateProfileRequestBody = {};

    const project_description_guideline = data.get("briefDescriptionGuide");
    if (project_description_guideline) {
      requestBody.project_description_guideline =
        project_description_guideline.toString();
    }

    const payment_instructions = data.get("paymentInstructions");
    if (payment_instructions) {
      requestBody.payment_instructions = payment_instructions.toString();
    }

    const lead_time_in_weeks = data.get("leadTime");
    if (lead_time_in_weeks) {
      requestBody.lead_time_in_weeks = parseInt(lead_time_in_weeks.toString());
    }

    const slots_per_month = data.get("slotsPerMonth");
    if (slots_per_month) {
      requestBody.slots_per_month = parseInt(slots_per_month.toString());
    }

    const res: data = await fetchData(
      "/api/creators/" + creatorId,
      "PATCH",
      requestBody
    );
    if (res.ok) {
      showSnackbar("Project settings updated successfully", "success");
    } else {
      console.log(JSON.stringify(res.data));
      showSnackbar("Project settings updated failed", "warning");
    }
  };

  //product option functions

  //upload product image for preview
  const handleSelectProductImage = (event: any) => {
    const imageFile = event.target.files[0];
    setSelectedProductImage(imageFile);
  };

  //add product
  const handleAddProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //construct request body
    const submittedData = new FormData(event.currentTarget);

    const requestBody = {
      title: submittedData.get("title"),
      description: submittedData.get("description"),
      currency: submittedData.get("currency"),
      starting_price: submittedData.get("starting_price"),
    };
    console.log(requestBody);

    //append image and body to formData
    const formData = new FormData();
    if (selectedProductImage) {
      formData.append("image", selectedProductImage);
    }
    formData.append("title", requestBody.title as string);
    formData.append("description", requestBody.description as string);
    formData.append("currency", requestBody.currency as string);
    formData.append("starting_price", requestBody.starting_price as string);

    console.log(formData);
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/api/creators/products/" + creatorId,
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
        setOpenAddProductDialog(false);
      } else {
        returnValue = { ok: true, data };
        setSelectedProductImage(null); //reset default
        showSnackbar("Product added successfully", "success");
        setOpenAddProductDialog(false);
        getProducts();
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
    }

    return returnValue;
  };

  //close dialog to add product
  const handleCloseAddProductDialog = () => {
    setOpenAddProductDialog(false);
  };

  //delete product
  const handleDeleteProduct = async (productId: string) => {
    console.log(`Delete project with ID: ${productId}`);

    const res: data = await fetchData(
      "/api/creators/products/" + productId,
      "DELETE",
      undefined,
      undefined
    );

    if (res.ok) {
      showSnackbar("Product deleted successfully", "success");
      getProducts();
    } else {
      console.log(JSON.stringify(res.data));
      showSnackbar("Failed to delete product", "warning");
    }
  };

  //load page
  if (isLoading) {
    return <div>Loading...</div>;
  } else
    return (
      <>
        <Grid container paddingY={4}>
          <Grid container rowSpacing={2}>
            {/* Request form settings */}
            <Grid item xs={9}>
              <Paper variant="outlined">
                <Typography variant="h6" component="h4" padding={2}>
                  Request form settings
                </Typography>
                <Typography variant="body1" component="body" padding={2}>
                  Set up your project request form. Patrons will see these
                  guidelines when they submit a request to you.
                </Typography>

                <Box
                  component="form"
                  onSubmit={handleUpdateProfile}
                  noValidate
                  sx={{ mt: 1 }}
                  paddingX={2}
                >
                  <TextField
                    margin="normal"
                    fullWidth
                    multiline
                    id="briefDescriptionGuide"
                    label="Request guidelines"
                    name="briefDescriptionGuide"
                    placeholder="What you want your patrons to enter in the request description box. The more specific the better"
                    defaultValue={creatorData?.project_description_guideline}
                  />

                  <TextField
                    margin="normal"
                    fullWidth
                    multiline
                    id="paymentInstructions"
                    label="Payment instructions"
                    name="paymentInstructions"
                    placeholder="Short description of your payment terms. E.g. your bank account information, payment deadlines"
                    defaultValue={creatorData?.payment_instructions}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Save
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Project preferences */}
            <Grid item xs={9}>
              <Paper variant="outlined">
                <Typography variant="h6" component="h4" padding={2}>
                  Project preferences
                </Typography>
                <Typography variant="body1" component="body" padding={2}>
                  Set up your project preferences. These will be displayed on
                  your page.
                </Typography>

                <Box
                  component="form"
                  onSubmit={handleUpdateProfile}
                  noValidate
                  sx={{ mt: 1 }}
                  paddingX={2}
                >
                  <TextField
                    margin="normal"
                    fullWidth
                    id="slotsPerMonth"
                    label="Slots per month"
                    name="slotsPerMonth"
                    type="number"
                    placeholder="Display how many project slots you offer per month."
                    defaultValue={creatorData?.slots_per_month}
                  />

                  <TextField
                    margin="normal"
                    fullWidth
                    id="leadtime"
                    label="Lead time in weeks"
                    name="leadTime"
                    type="number"
                    placeholder="Display how much lead time your projects typically need."
                    defaultValue={creatorData?.lead_time_in_weeks}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Save
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Products and services */}
            <Grid item xs={9}>
              <Paper variant="outlined">
                <Typography variant="h6" component="h4" padding={2}>
                  Products and Services
                </Typography>
                <Typography variant="body1" component="body" padding={2}>
                  Provide up to 3 sample product options that potential patrons
                  can choose from.
                </Typography>
                <Grid
                  container
                  flexDirection={"row"}
                  spacing={1}
                  paddingLeft={2}
                >
                  {products?.map((data: any, index: number) => (
                    <CreatorProductCard
                      key={index}
                      {...data}
                      onDelete={() => handleDeleteProduct(data.id)}
                    />
                  ))}
                </Grid>
                <Box sx={{ mt: 1 }} paddingX={2}>
                  <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    startIcon={<ModeEditOutlineOutlinedIcon />}
                    onClick={() => {
                      setOpenAddProductDialog(true);
                    }}
                  >
                    Add Product
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Project process */}
            <Grid item xs={9}>
              <Paper variant="outlined">
                <Typography variant="h6" component="h4" padding={2}>
                  Project process
                </Typography>
                <Typography variant="body1" component="body" padding={2}>
                  Set up your project stages to give your patrons an idea of
                  what to expect in process of commissionning work with you.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* dialog for add product */}
        <Dialog
          open={openAddProductDialog}
          onClose={handleCloseAddProductDialog}
        >
          <DialogTitle>Add Product Option</DialogTitle>
          <Box component="form" onSubmit={handleAddProduct} noValidate>
            <DialogContent>
              <Typography variant="body1">Upload image</Typography>
              <Card>
                {selectedProductImage ? (
                  <CardMedia
                    component="img"
                    alt="product-image"
                    src={URL.createObjectURL(selectedProductImage)}
                    sx={{ maxWidth: "300px" }}
                  />
                ) : (
                  <CardContent>No image</CardContent>
                )}
              </Card>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="product-image-upload-button"
                type="file"
                onChange={handleSelectProductImage}
              />
              <label htmlFor="product-image-upload-button">
                <Button
                  variant="outlined"
                  component="span"
                  color="primary"
                  size="small"
                  startIcon={<EditIcon></EditIcon>}
                >
                  Add new
                </Button>
              </label>
              <TextField
                autoFocus
                margin="normal"
                fullWidth
                id="projectTitle"
                label="Title"
                name="title"
                type="text"
                placeholder="Product option title"
              />
              <TextField
                autoFocus
                multiline
                minRows={2}
                margin="normal"
                fullWidth
                id="projectDescription"
                label="Description"
                name="description"
                type="text"
                placeholder="Add a short description of this product option, such as the size, materials, and complexity"
              />

              <Autocomplete
                disablePortal
                options={["SGD", "USD"]}
                renderInput={(params) => (
                  <TextField
                    name="currency"
                    margin="normal"
                    {...params}
                    label="Currency"
                  />
                )}
              />
              <TextField
                autoFocus
                margin="normal"
                fullWidth
                id="startingPrice"
                label="Starting rate"
                name="starting_price"
                type="number"
                placeholder="Add your starting rate for this product option"
              />
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" type="submit">
                Add
              </Button>
              <Button variant="outlined" onClick={handleCloseAddProductDialog}>
                Cancel
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </>
    );
};

export default CreatorProjectConfig;
