import * as React from "react";
import Card from "@mui/material/Card";
import { CardActionArea, Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./BriefProductOption.css";

const BriefProductOption = (props: {
  handleSelectProduct(id: string | undefined): void;
  description: string;
  onClick: React.MouseEventHandler<HTMLLIElement> | undefined;
  title?: string;
  currency?: string;
  starting_price?: number;
  image_url?: string;
  id?: string;
  displayDelete?: boolean;
  width?: number;
  className?: string;
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
        onClick={() => props.handleSelectProduct(props.id)}
        className={props.className}
      >
        <CardActionArea>
          <CardMedia
            sx={{
              height: 150,
              padding: "1em 1em 0 1em",
              objectFit: "cover",
            }}
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
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default BriefProductOption;
