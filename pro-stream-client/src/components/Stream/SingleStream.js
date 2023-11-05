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
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";

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
  let CHAT_CONTENT = [
    "Hi",
    "Hello",
    "How are you?",
    "I am fine. What's your name?",
    "My name is atiq. you?",
    "I am mahboob",
  ];

  const [inputValue, setInputValue] = React.useState("");
  const [dataArray, setDataArray] = React.useState(CHAT_CONTENT);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setDataArray([...dataArray, inputValue]);
    setInputValue("");
  };

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const params = useParams();
  console.log(params.id);

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "fixed",
          top: "70px",
          right: "10px",
        }}
        zIndex={1}
      >
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
      </Box>

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
          <Box sx={{ height: "100%", position: "relative" }}>
            {/*  Chat Page */}
            <Box>
              <InfiniteScroll dataLength={CHAT_CONTENT.length} height="700px">
                {dataArray.map((item, index) => {
                  return (
                    <Box key={index}>
                      <Typography variant="body" sx={{ color: "white" }}>
                        {item}
                      </Typography>
                      <br />
                    </Box>
                  );
                })}
              </InfiniteScroll>
            </Box>
            <Box sx={{ position: "absolute", bottom: "70px" }}>
              <Grid container paddingY={2} alignItems="center" spacing={1}>
                <Grid item xs={9.5}>
                  <form onSubmit={handleFormSubmit}>
                    <Grid container columns={9.5} spacing={1}>
                      <Grid item xs={7}>
                        <TextField
                          required
                          size="small"
                          id="outlined-basic"
                          variant="outlined"
                          sx={{
                            background: "white",
                            width: "100%",
                          }}
                          value={inputValue}
                          onChange={handleInputChange}
                          placeholder="Enter text"
                        />
                      </Grid>

                      <Grid item xs={2.5}>
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ padding: "1px" }}
                          endIcon={
                            <SendIcon sx={{ width: "40px", height: "40px" }} />
                          }
                        />
                      </Grid>
                    </Grid>
                  </form>
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
            </Box>
          </Box>
        </Drawer>
      </Box>
      <Footer marginRightFooter={open ? "340px" : "50px"} />
    </Box>
  );
}