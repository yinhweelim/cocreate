import * as React from "react";
import Card from "@mui/material/Card";
import { Button, Chip, Grid } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const ProjectBriefCard = (props: {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onDelete: () => void;
  details?: string;
  budget_currency?: string;
  budget_amount?: number;
  image_url?: string;
  id?: string;
  delivery_method?: string;
  creator_id?: string;
  patron_id?: string;
  product_id?: string;
  deadline?: string;
  brief_expiry_date?: string;
  consultation_slot?: string;
  status?: string;
  product_name?: string;
  creator_name?: string;
  created_at?: string;
}) => {
  let chip = null;
  if (props.status === "PENDING_RESPONSE") {
    chip = <Chip variant="outlined" color="primary" label="PENDING RESPONSE" />;
  } else if (props.status === "ACCEPTED") {
    chip = <Chip variant="outlined" color="success" label="ACCEPTED" />;
  } else if (props.status === "CANCELLED") {
    chip = <Chip variant="outlined" color="secondary" label="CANCELLED" />;
  } else if (props.status === "DECLINED") {
    chip = <Chip variant="outlined" color="secondary" label="DECLINED" />;
  }
  return (
    <Grid item xs={4}>
      <Card
        sx={{
          height: 400,
          maxWidth: 280,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          sx={{ height: 300, padding: "1em 1em 0 1em", objectFit: "cover" }}
          image={props.image_url || undefined}
          title="Portfolio Image"
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: "400" }}>
            {props.product_name}
          </Typography>
          <Typography variant="body1">by {props.creator_name}</Typography>
          <Typography variant="subtitle1">
            Started {props?.created_at}
          </Typography>
          <Typography variant="subtitle1" paddingBottom={1}>
            {props.budget_currency} {props.budget_amount}
          </Typography>
          {chip}
        </CardContent>

        <CardActions
          sx={{
            justifyContent: "flex",
          }}
        >
          {" "}
          {props.status != "PENDING_RESPONSE" ? (
            <Button variant="outlined" size="small" onClick={props.onClick}>
              View
            </Button>
          ) : (
            <Button variant="outlined" size="small" onClick={props.onClick}>
              Manage
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProjectBriefCard;
