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
  name?: string;
  title?: string;
  product_image_url?: string;
  deadline?: string;
  product_name?: string;
  patron_name?: string;
  budget_currency?: string;
  budget_amount?: string;
}

const CreatorProjectCard = (props: CardProps) => {
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
          image={props.product_image_url}
          title="Product Image"
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: "400" }}>
            {props.name}
          </Typography>
          <Typography variant="body2">
            {props.product_name} for {props.patron_name}
          </Typography>
          <Typography variant="body2" paddingBottom={1}>
            Budget {props.budget_currency} {props.budget_amount}
          </Typography>
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
