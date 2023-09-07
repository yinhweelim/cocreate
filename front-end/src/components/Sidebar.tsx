import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import InsightsIcon from "@mui/icons-material/Insights";
import MailIcon from "@mui/icons-material/Mail";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton, Stack, Avatar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar() {
  return (
    <Box sx={{ display: "flex" }}>
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
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Projects"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"page"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AutoAwesomeIcon />
              </ListItemIcon>
              <ListItemText primary={"My page"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"analytics"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InsightsIcon />
              </ListItemIcon>
              <ListItemText primary={"Analytics"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"messagaes"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={"Messages"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"settings"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Settings"} />
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItemButton>
            <Avatar sx={{ width: 30, height: 30 }}></Avatar>
            <Box paddingLeft={2} sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">Display Name</Typography>
              <Typography variant="subtitle2">User Role</Typography>
            </Box>
            <IconButton
              color="default"
              size="large"
              component={RouterLink}
              to="/home"
            >
              <MoreVertIcon></MoreVertIcon>
            </IconButton>
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
