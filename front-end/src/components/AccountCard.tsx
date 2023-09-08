import React, { ReactNode } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const AccountCard = (props: {
  iconButton?: ReactNode;
  onClick: React.MouseEventHandler<HTMLLIElement> | undefined;
  given_name?: string;
  role?: string;
  avatar_image_url?: string;
  id?: string;
}) => {
  return (
    <>
      <ListItem disablePadding onClick={props.onClick} id={props.id}>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar src={props.avatar_image_url}></Avatar>
          </ListItemAvatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">{props.given_name}</Typography>
            <Typography variant="subtitle2">{props.role}</Typography>
          </Box>
          {props.iconButton}
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default AccountCard;
