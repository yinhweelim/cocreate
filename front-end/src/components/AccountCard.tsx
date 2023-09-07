import React, { ReactNode } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Box,
  Typography,
  IconButton,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

const AccountCard = (props: {
  iconButton?: ReactNode;
  onClick: React.MouseEventHandler<HTMLLIElement> | undefined;
}) => {
  return (
    <>
      <ListItem disablePadding onClick={props.onClick}>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Display Name</Typography>
            <Typography variant="subtitle2">User Role</Typography>
          </Box>
          {props.iconButton}
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default AccountCard;
