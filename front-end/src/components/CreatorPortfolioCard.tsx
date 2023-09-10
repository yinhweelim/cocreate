import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const CreatorPortfolioCard = (props: any) => {
  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          Title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Caption
        </Typography>
      </CardContent>
    </Card>
  );
};
export default CreatorPortfolioCard;
