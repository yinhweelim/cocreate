import * as React from "react";
import { useContext } from "react";
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
import UserContext from "../context/UserContext";

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
  created_at?: string;
  creator_name?: string;
}

const CreatorProjectCard = (props: CardProps) => {
  const userCtx = useContext(UserContext);
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 5,
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
            sx={{ height: 240, padding: "1em 1em 0 1em", objectFit: "cover" }}
            image={props.product_image_url}
            title="Product Image"
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: "400" }}>
              {props.name}
            </Typography>
            {userCtx?.currentUser.role === "CREATOR" ? (
              <Typography variant="body1">for {props.patron_name}</Typography>
            ) : (
              <Typography variant="body1">by {props.creator_name}</Typography>
            )}

            <Typography variant="subtitle1">
              Started {props.created_at}
            </Typography>
            <Typography variant="subtitle1" paddingBottom={1}>
              {props.budget_currency} {props.budget_amount}
            </Typography>

            <BorderLinearProgress variant="determinate" value={progressValue} />

            <Typography variant="subtitle1" paddingY={1}>
              Stage: {props.current_stage}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default CreatorProjectCard;
