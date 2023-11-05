import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import Video from "./Video";
import Chat from "./Chat";
import MoreVert from "@mui/icons-material/MoreVert";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import stream1 from "../../Images/stream1.png";
import stream2 from "../../Images/mickey_mouse.png";
import stream3 from "../../Images/stream3.png";
import VerifiedIcon from "@mui/icons-material/Verified";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const TikTokIcon = ({ color = "#ffffff" }) => {
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="25px"
      height="25px"
    >
      <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
    </svg>
  );
};

const Stream = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ marginTop: "20px", padding: "5px" }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <Paper elevation={1}>
            <iframe
              width="100%"
              height="360"
              src="https://www.youtube.com/embed/xjMP0hspNLE"
              title="Video Player"
              allowFullScreen
            ></iframe>
          </Paper>
          <Stack direction="column" spacing={1}>
            <Grid
              container
              alignItems="center"
              spacing={1}
              justifyContent="space-between"
            >
              <Grid item>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <Avatar
                      sx={{ height: "70px", width: "70px" }}
                      src="https://i.ibb.co/xHhvpZj/people-1.png"
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" sx={{ color: "white" }}>
                      Atiqur Rahman
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white" }}>
                      [Drops] New battle item inventory
                    </Typography>
                    <Typography variant="h6" sx={{ color: "white" }}>
                      Category name
                    </Typography>
                    <Typography variant="body" sx={{ color: "white" }}>
                      tag1
                    </Typography>{" "}
                    <Typography variant="body" sx={{ color: "white" }}>
                      tag2
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{ marginRight: "5px" }}
                  startIcon={<AddReactionOutlinedIcon />}
                >
                  React
                </Button>
                <Button
                  variant="contained"
                  sx={{ marginRight: "5px" }}
                  startIcon={<FavoriteBorderIcon />}
                >
                  Follow
                </Button>
                <Button variant="contained" startIcon={<StarBorderIcon />}>
                  Subscribe
                </Button>
                <IconButton
                  aria-label="more"
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreVert sx={{ color: "white" }} />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  sx={{ marginTop: "5px" }}
                >
                  <MenuItem onClick={handleClose}>Report Live Stream</MenuItem>
                  <MenuItem onClick={handleClose}>
                    Report Someting Else
                  </MenuItem>
                </Menu>
              </Grid>
            </Grid>
            <Stack padding={2}>
              <Typography variant="h5" color="white">
                About Atiqur Rahman <VerifiedIcon />
              </Typography>
              <Typography variant="body2" color="white">
                <b>5.4M</b> followers
              </Typography>
              <br />
              <Typography variant="text2" color="white">
                Welcome to the Riot Games channel, home of LoL Esports and other
                livestreams related to our games. For LoL Esports broadcasts,
                schedules, standings and advanced viewing features, head to
                http://lolesports.com.
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} padding={2}>
              <Button
                variant="outlined"
                sx={{ color: "white" }}
                startIcon={<FacebookIcon />}
              >
                Facebook
              </Button>
              <Button
                variant="outlined"
                sx={{ color: "white" }}
                startIcon={<YouTubeIcon />}
              >
                YouTube
              </Button>
              <Button
                variant="outlined"
                sx={{ color: "white" }}
                startIcon={<InstagramIcon />}
              >
                Instagram
              </Button>
              <Button
                variant="outlined"
                sx={{ color: "white" }}
                startIcon={<TikTokIcon />}
              >
                TikTok
              </Button>
            </Stack>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Stack direction="column">
                  <Typography variant="h5" sx={{ color: "white" }}>
                    Hi,
                  </Typography>
                  <Typography variant="h5" sx={{ color: "white" }}>
                    My name is Atiqur Rahman
                  </Typography>
                  <Typography
                    variant="text"
                    sx={{ color: "white", marginTop: "20px" }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                    dolores enim consequuntur, alias sapiente voluptates
                    consectetur, ipsam possimus qui eum hic ipsum amet ipsa
                    distinctio assumenda laboriosam ullam ea molestias.
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <img
                  style={{ width: "100%", height: "400px" }}
                  src={stream2}
                  alt=""
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <img
                  style={{ width: "100%", height: "400px" }}
                  src={stream2}
                  alt=""
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack direction="column">
                  <Typography variant="h5" sx={{ color: "white" }}>
                    All Videos
                  </Typography>
                  <Typography variant="h5" sx={{ color: "white" }}>
                    My videos are technical education.
                  </Typography>
                  <Typography
                    variant="text"
                    sx={{ color: "white", marginTop: "20px" }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                    dolores enim consequuntur, alias sapiente voluptates
                    consectetur, ipsam possimus qui eum hic ipsum amet ipsa
                    distinctio assumenda laboriosam ullam ea molestias.
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Grid>

        {/*  Chat Page */}
        <Grid item xs={12} md={4}>
          <Typography sx={{ color: "white", textAlign: "center" }} variant="h4">
            Stream Chat
          </Typography>
          <Paper elevation={3} sx={{ height: "400px" }}>
            <Typography variant="body">Hi</Typography>
            <br />
            <Typography variant="body">Hello</Typography>
            <br />
            <Typography variant="body">How are you?</Typography>
            <br />
            <Typography variant="body">
              I am fine by the grace of allah. And you?
            </Typography>
            <br />
          </Paper>
          <Grid container paddingY={2} alignItems="center" spacing={2}>
            <Grid item xs={8}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                sx={{
                  background: "white",
                  width: "100%",
                  marginRight: "10px",
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                endIcon={<SendIcon sx={{ width: "50px", height: "40px" }} />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Stream;
