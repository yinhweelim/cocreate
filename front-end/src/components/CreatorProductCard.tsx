import * as React from "react";
import Card from "@mui/material/Card";
import { Grid, IconButton } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";

const CreatorPortfolioCard = (props: {
  description: string;
  onClick: React.MouseEventHandler<HTMLLIElement> | undefined;
  onDelete: () => void;
  title?: string;
  currency?: string;
  starting_price?: number;
  image_url?: string;
  id?: string;
  displayDelete?: boolean;
  width?: number;
}) => {
  return (
    <Grid item xs={4}>
      <Card
        sx={{
          height: 300,
          width: props.width,
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
          <Typography gutterBottom variant="body1" component="div">
            {props.title || "Title"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description || "Caption"}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            From {props.currency || "Currency"}{" "}
            {props.starting_price || "Starting price"}
          </Typography>
        </CardContent>
        {props.displayDelete ? (
          <CardActions
            sx={{
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              aria-label="delete"
              onClick={props.onDelete}
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        ) : (
          <></>
        )}
      </Card>
    </Grid>
  );
};

export default CreatorPortfolioCard;
