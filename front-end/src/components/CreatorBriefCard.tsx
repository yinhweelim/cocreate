import * as React from "react";
import Card from "@mui/material/Card";
import { Button, CardHeader, Chip, Grid, IconButton } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const CreatorBriefCard = (props: {
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
}) => {
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

          <Chip variant="outlined" label={props.status} />
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

export default CreatorBriefCard;
