import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import InsightsIcon from "@mui/icons-material/Insights";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SettingsIcon from "@mui/icons-material/Settings";
import { Divider } from "@mui/material";
import { IconButton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AccountCard from "./AccountCard";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSidebar } from "../context/SidebarContext";
const drawerWidth = 240;

//dialog to switch accounts
import { Dialog, DialogTitle } from "@mui/material";
import { jsx } from "@emotion/react";
interface SimpleDialogProps {
  open: boolean;
  selectedValue: string | null;
  onClose: (value: string | null) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const userCtx = useContext(UserContext);
  const userArray = userCtx?.userArray;

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} sx={{ width: "300px" }}>
      <DialogTitle>Switch account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {userArray.map((data: any, index: number) => (
          <AccountCard
            key={index}
            onClick={() => handleListItemClick(data)}
            {...data} // Pass all user properties as props
          />
        ))}
        <Divider></Divider>
        <ListItem disablePadding>
          <ListItemButton autoFocus component={RouterLink} to="/">
            <ListItemText primary={"Log out"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

//sidebar
export default function Sidebar() {
  const userCtx = useContext(UserContext);
  const currentUser = userCtx?.currentUser;

  //highlight selected item in sidebar
  const { selectedIndex, setSelectedIndex } = useSidebar();

  const handleListItemClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  //switch account dialog states
  const [open, setOpen] = React.useState(false);
  // const [selectedValue, setSelectedValue] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: any) => {
    setOpen(false);

    // Check if a value is selected before updating the current user
    if (value !== null) {
      userCtx?.setCurrentUser(value);
      setSelectedValue(value); // Update selectedValue when a value is selected
    }
  };

  return (
    <>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: "flex",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box padding={1}>
          <IconButton
            color="default"
            size="large"
            component={RouterLink}
            to="/home"
          >
            <img src="/src/assets/logo-small.png" width={"25px"}></img>
          </IconButton>
        </Box>
        <List sx={{ flexGrow: 1 }}>
          {userCtx?.currentUser.role === "CREATOR" ? (
            <>
              {" "}
              <ListItem key={"projects"} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/projects"
                  selected={selectedIndex === 0}
                  onClick={(event) => handleListItemClick(event, 0)}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Projects"} />
                </ListItemButton>
              </ListItem>
              <ListItem key={"page"} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/pagesetup"
                  selected={selectedIndex === 1}
                  onClick={(
                    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                  ) => handleListItemClick(event, 1)}
                >
                  <ListItemIcon>
                    <AutoAwesomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"My page"} />
                </ListItemButton>
              </ListItem>
              <ListItem key={"analytics"} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/analytics"
                  selected={selectedIndex === 2}
                  onClick={(event) => handleListItemClick(event, 2)}
                >
                  <ListItemIcon>
                    <InsightsIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Analytics"} />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <ListItem key={"commissions"} disablePadding>
              <ListItemButton
                component={RouterLink}
                to="/commissions"
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Commissions"} />
              </ListItemButton>
            </ListItem>
          )}

          <ListItem key={"settings"} disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/settings"
              selected={selectedIndex === 4}
              onClick={(event) => handleListItemClick(event, 4)}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Settings"} />
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <Divider />
          <AccountCard
            onClick={handleClickOpen}
            given_name={currentUser.given_name}
            role={currentUser.role}
            avatar_image_url={currentUser.avatar_image_url}
            key={currentUser.user_id}
            iconButton={
              <IconButton
                color="default"
                size="large"
                component={RouterLink}
                to="/home"
              >
                <MoreVertIcon />
              </IconButton>
            }
          ></AccountCard>
        </List>

        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
      </Drawer>
    </>
  );
}
