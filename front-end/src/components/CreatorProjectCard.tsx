import * as React from "react";
import Card from "@mui/material/Card";
import {
  Button,
  CardActionArea,
  CardHeader,
  Chip,
  Grid,
  IconButton,
  styled,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import LinearProgress, {
  LinearProgressProps,
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Box from "@mui/material";

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
  current_stage?: string;
  current_stage_index?: number;
  total_stage_count?: number;
}

const CreatorProjectCard = (props: CardProps) => {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));

  const progressValue =
    (props?.current_stage_index! / props?.total_stage_count!) * 100;

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
        <CardActionArea onClick={props.onClick}>
          <CardMedia
            sx={{ height: 250, padding: "1em 1em 0 1em", objectFit: "cover" }}
            image={props.product_image_url}
            title="Product Image"
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: "400" }}>
              {props.name}
            </Typography>
            <Typography variant="body2">for {props.patron_name}</Typography>
            <Typography variant="body2" paddingBottom={1}>
              {props.budget_currency} {props.budget_amount}
            </Typography>

            <BorderLinearProgress variant="determinate" value={progressValue} />

            <Typography variant="body2" paddingY={1}>
              Stage: {props.current_stage}
            </Typography>
          </CardContent>
        </CardActionArea>
        {/* <CardActions
          sx={{
            justifyContent: "flex",
          }}
        >
          <Button variant="outlined" size="small" onClick={props.onClick}>
            View
          </Button>
        </CardActions> */}
      </Card>
    </Grid>
  );
};

export default CreatorProjectCard;
