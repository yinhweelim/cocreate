import * as React from "react";
import Card from "@mui/material/Card";
import { Grid, IconButton } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";

const CreatorPortfolioCard = (props: {
  onClick: React.MouseEventHandler<HTMLLIElement> | undefined;
  onDelete: () => void;
  title?: string;
  caption?: string;
  currency?: string;
  starting_price?: number;
  image_url?: string;
  id?: string;
  displayDelete?: boolean;
}) => {
  return (
    <Grid item xs={4}>
      <Card
        sx={{
          maxWidth: 200,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          sx={{ height: 150, padding: "1em 1em 0 1em", objectFit: "cover" }}
          image={props.image_url || undefined}
          title="Portfolio Image"
        />
        <CardContent style={{ flex: 1 }}>
          <Typography gutterBottom variant="body1" component="div">
            {props.title || "Title"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.caption || "Caption"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.currency || "Currency"}
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
