import * as React from "react";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const CreatorPortfolioCard = (props: {
  title?: string;
  caption?: string;
  image_url?: string;
  id?: string;
}) => {
  return (
    <Grid item xs={4}>
      <Card sx={{ maxWidth: 200 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={
            props.image_url || "/static/images/cards/contemplative-reptile.jpg"
          }
          title="Portfolio Image"
        />
        <CardContent>
          <Typography gutterBottom variant="body1" component="div">
            {props.title || "Title"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.caption || "Caption"}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CreatorPortfolioCard;
