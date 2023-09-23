import { Brief } from "../interfaces";
import { Typography, Grid, Card, CardMedia } from "@mui/material";

const BriefDetails = (props: { brief: Brief | null }) => {
  return (
    <>
      <Typography variant="subtitle1">
        {" "}
        Received {props.brief?.created_at}
      </Typography>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs={6}>
          {" "}
          <Typography variant="overline">Option</Typography>
          <br />
          <Typography variant="body1">
            {props.brief?.product_name ? props.brief?.product_name : ""}
            <br />
          </Typography>
        </Grid>
        <Grid item xs={6}>
          {" "}
          <Typography variant="overline">Their budget</Typography>
          <br />
          <Typography variant="body1">
            {props.brief?.budget_currency}
            {props.brief?.budget_amount} <br />
          </Typography>
        </Grid>

        <Grid item xs={6}>
          {" "}
          <Typography variant="overline">Status</Typography>
          <br />
          <Typography variant="body1">
            {props.brief?.status} <br />
          </Typography>
        </Grid>
        <Grid item xs={6}>
          {" "}
          <Typography variant="overline" paddingTop={2}>
            Delivery method
          </Typography>
          <Typography variant="body1">
            {props.brief?.delivery_method} <br />
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="overline" paddingTop={2}>
        Brief details
      </Typography>
      <Typography variant="body1">
        {props.brief?.details} <br />
      </Typography>

      {props.brief?.image_url ? (
        <>
          {" "}
          <Typography variant="overline" paddingTop={2}>
            Reference images
          </Typography>
          <Card sx={{ maxWidth: "300px" }}>
            <CardMedia
              component="img"
              alt="reference image"
              src={props.brief?.image_url}
              sx={{ maxWidth: "300px" }}
            />
          </Card>
        </>
      ) : (
        ""
      )}
      {/* <Box paddingY={1}>
        <Typography variant="overline" paddingTop={2}>
          Deadline
        </Typography>
        <Typography variant="body1">
          {props.brief?.deadline} <br />
        </Typography>
      </Box>
      <Box paddingY={1}>
        <Typography variant="overline" paddingTop={2}>
          Consultation Slot
        </Typography>
        <Typography variant="body1">
          {props.brief?.consultation_slot} <br />
        </Typography>
      </Box> */}
    </>
  );
};

export default BriefDetails;
