import * as React from "react";
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
import { IconButton, Avatar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AccountCard from "./AccountCard";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const drawerWidth = 240;

//switch account dialog
import { Dialog, DialogTitle } from "@mui/material";
interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    console.log(value);
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} sx={{ width: "300px" }}>
      <DialogTitle>Switch account</DialogTitle>
      <List sx={{ pt: 0 }}>
        <AccountCard
          onClick={() => handleListItemClick("switchAccount")}
        ></AccountCard>
        <AccountCard
          onClick={() => handleListItemClick("switchAccount")}
        ></AccountCard>
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

export default function Sidebar() {
  //switch account dialog states
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
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
          {" "}
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
          <ListItem key={"projects"} disablePadding>
            <ListItemButton component={RouterLink} to="/projects">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Projects"} />
            </ListItemButton>
          </ListItem>

          <ListItem key={"page"} disablePadding>
            <ListItemButton component={RouterLink} to="/pagesetup">
              <ListItemIcon>
                <AutoAwesomeIcon />
              </ListItemIcon>
              <ListItemText primary={"My page"} />
            </ListItemButton>
          </ListItem>

          <ListItem key={"analytics"} disablePadding>
            <ListItemButton component={RouterLink} to="/analytics">
              <ListItemIcon>
                <InsightsIcon />
              </ListItemIcon>
              <ListItemText primary={"Analytics"} />
            </ListItemButton>
          </ListItem>

          <ListItem key={"commissions"} disablePadding>
            <ListItemButton component={RouterLink} to="/commissions">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Commissions"} />
            </ListItemButton>
          </ListItem>

          <ListItem key={"settings"} disablePadding>
            <ListItemButton component={RouterLink} to="/settings">
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
