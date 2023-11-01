import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { navbarItems } from "./NavbarItems";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../Common/NavBar";
import { Grid, Toolbar, Typography } from "@mui/material";
import { getToken } from "../../services/LocalStorageService";
import { setUserToken } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import Footer from "../Common/Footer";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  backgroundColor: "black",
  color: "white",
}));

const openedMixin = (theme) => ({
  overflowX: "hidden",
  width: drawerWidth,
  boxSizing: "border-box",
  backgroundColor: "black",
  color: "rgba(255,255,255)",

  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme) => ({
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  boxSizing: "border-box",
  backgroundColor: "black",
  color: "rgba(255,255,255)",

  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Home() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();

  const handleDrawer = () => {
    setOpen(!open);
  };

  let { access_token } = getToken();
  React.useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }));
  }, [access_token, dispatch]);
  return (
    <Box>
      <NavBar />
      <Box sx={{ display: "flex", background: "black" }}>
        <CssBaseline />

        {/* drawer code */}
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              // width: drawerWidth,
              boxSizing: "border-box",
              marginTop: "75px",
            },
          }}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawer}>
              {open === true ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="text"
                    sx={{ color: "white", textAlign: "start" }}
                  >
                    For You
                  </Typography>
                  <ChevronLeftIcon
                    sx={{ color: "white", marginLeft: "90px" }}
                  />
                </Box>
              ) : (
                <MenuIcon sx={{ color: "white" }} />
              )}
            </IconButton>
          </DrawerHeader>
          {/* <Divider sx={{ backgroundColor: "white" }} /> */}
          <List>
            {navbarItems.map((text, index) => (
              <ListItem key={text.id} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={() => navigate(text.route)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "rgba(255,255,255)",
                    }}
                  >
                    {text.icon}
                  </ListItemIcon>
                  <Grid
                    container
                    justifyContent="space-between"
                    sx={{ opacity: open ? 1 : 0 }}
                  >
                    <Grid item>
                      <ListItemText primary={text.label} />
                    </Grid>
                    <Grid item>
                      <ListItemText
                        primary={text.watching}
                        sx={{ color: "red" }}
                      />
                    </Grid>
                  </Grid>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        {/* Main part */}
        <Box sx={{ flexGrow: 1 }}>
          <Toolbar sx={{ marginBottom: "10px" }} />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
