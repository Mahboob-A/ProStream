import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Stream from "./Stream";
import SendIcon from "@mui/icons-material/Send";
import { navbarItems } from "../Home/NavbarItems";
import { Button, Grid, Paper, Stack, TextField } from "@mui/material";
import StartSharpIcon from "@mui/icons-material/StartSharp";
import Footer from "../Common/Footer";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

const drawerWidth = 340;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
    /**
     * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
     * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
     * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
     * proper interaction with the underlying content.
     */
    position: "relative",
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  backgroundColor: "black",
  color: "white",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function SingleStream() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <Box>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="end"
        onClick={handleDrawerOpen}
        sx={{
          ...(open
            ? {
                display: "none",
              }
            : {
                color: "red",
                display: "block",
                marginTop: "0px",
                marginLeft: "auto",
                marginRight: "10px",
                // backgroundColor: "red",
              }),
        }}
      >
        <StartSharpIcon
          sx={{ color: "white" }}
          style={{ transform: `rotate(180deg)` }}
        />
      </IconButton>

      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* <Toolbar /> */}
        <Main open={open}>
          <Stream />
        </Main>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              marginTop: "75px",
              backgroundColor: "#18181b",
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
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
                  <StartSharpIcon sx={{ color: "white", mr: 6 }} />
                  <Typography
                    variant="text"
                    sx={{ color: "white", textAlign: "start" }}
                  >
                    Stream Chat
                  </Typography>
                </Box>
              ) : (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerOpen}
                  sx={{
                    ...(open
                      ? {
                          display: "none",
                        }
                      : {
                          color: "red",
                          display: "block",
                          marginTop: "0px",
                          marginLeft: "auto",
                          marginRight: "10px",
                        }),
                  }}
                >
                  <StartSharpIcon
                    sx={{ color: "white", mr: 2 }}
                    style={{ transform: `rotate(180deg)` }}
                  />
                </IconButton>
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Grid container padding={1} alignItems="space-between">
            {/*  Chat Page */}
            <Grid item>
              <Paper
                elevation={3}
                sx={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#18181b",
                }}
              >
                <Typography variant="body" sx={{ color: "white" }}>
                  Hi
                </Typography>
                <br />
                <Typography variant="body" sx={{ color: "white" }}>
                  Hello
                </Typography>
                <br />
                <Typography variant="body" sx={{ color: "white" }}>
                  How are you?
                </Typography>
                <br />
                <Typography variant="body" sx={{ color: "white" }}>
                  I am fine by the grace of allah. And you?
                </Typography>
                <br />
                <Typography variant="body" sx={{ color: "white" }}>
                  I am fine by the grace of allah. And you?
                </Typography>
                <br />
                <Typography variant="body" sx={{ color: "white" }}>
                  I am fine by the grace of allah. And you?
                </Typography>
                <br />
                <Typography variant="body" sx={{ color: "white" }}>
                  I am fine by the grace of allah. And you?
                </Typography>
                <br />
                <Typography variant="body" sx={{ color: "white" }}>
                  I am fine by the grace of allah. And you?
                </Typography>
                <br />
                <Typography variant="body" sx={{ color: "white" }}>
                  I am fine by the grace of allah. And you?
                </Typography>
                <br />
                <Typography variant="body" sx={{ color: "white" }}>
                  I am fine by the grace of allah. And you?
                </Typography>
                <br />
              </Paper>
            </Grid>
            <Grid item>
              <Grid container paddingY={2} alignItems="center" spacing={1}>
                <Grid item xs={7}>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    sx={{
                      background: "white",
                      width: "100%",
                    }}
                  />
                </Grid>
                <Grid item xs={2.5}>
                  <Button
                    variant="contained"
                    sx={{ padding: "1px" }}
                    endIcon={
                      <SendIcon sx={{ width: "40px", height: "40px" }} />
                    }
                  />
                </Grid>
                <Grid item xs={2.5}>
                  <Button
                    variant="contained"
                    sx={{ padding: "1px" }}
                    endIcon={
                      <VolunteerActivismIcon
                        sx={{ width: "40px", height: "40px" }}
                      />
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Drawer>
      </Box>
      <Footer marginRightFooter={open ? "340px" : "50px"} />
    </Box>
  );
}
