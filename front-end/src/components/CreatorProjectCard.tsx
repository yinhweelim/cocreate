import * as React from "react";
import Card from "@mui/material/Card";
import { Button, CardHeader, Chip, Grid, IconButton } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface CardProps {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onDelete: () => void;
  id?: string;
  title?: string;
  image_url?: string;
  deadline?: string;
  product_name?: string;
  patron_name?: string;
}

const CreatorProjectCard = (props: CardProps) => {
  //format chip
  let chip = null; // Initialize chip as null by default

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
          <Typography variant="body2">From {props.patron_name}</Typography>
          <Typography variant="body2" paddingBottom={1}>
            Budget {props.budget_currency} {props.budget_amount}
          </Typography>

          {chip}
        </CardContent>

        <CardActions
          sx={{
            justifyContent: "flex",
          }}
        >
          <Button variant="outlined" size="small" onClick={props.onClick}>
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CreatorProjectCard;
