import * as React from "react";
import Card from "@mui/material/Card";
import { Grid, IconButton } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";

const ProjectBriefCard = (props: {
  onClick: React.MouseEventHandler<HTMLLIElement> | undefined;
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
}) => {
  return (
    <Grid item xs={4}>
      <Card
        sx={{
          height: 300,
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
          <Typography variant="body2" color="text.secondary">
            {props.details || "Details"}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Budget: {props.budget_currency || "Currency"}{" "}
            {props.budget_amount || "Budget amount"}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {props.status}
          </Typography>
        </CardContent>

        <CardActions
          sx={{
            justifyContent: "flex-end",
          }}
        >
          <IconButton aria-label="delete" onClick={props.onDelete} size="small">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProjectBriefCard;
