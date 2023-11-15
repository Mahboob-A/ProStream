import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import MoreVert from "@mui/icons-material/MoreVert";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import mickeyMouse from "../../Images/mickey_mouse.png";
import VerifiedIcon from "@mui/icons-material/Verified";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import VideoStream from "../VideoStream/VideoStream";
import TwitterIcon from "@mui/icons-material/Twitter";
import axios from "axios";
import { getToken } from "../../services/LocalStorageService";

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

const Stream = ({
  streamerStreamData,
  streamerChannelData,
  socialLink,
  streamer_id,
}) => {
  // console.log("from stream page", streamerStreamData);
  // console.log("from stream page", streamerChannelData);
  // console.log("from stream page", socialLink);
  console.log("from stream page", streamer_id);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { access_token } = getToken();

  const [follow, setFollow] = React.useState(null);
  useEffect(() => {
    axios
      .get(
        "http://127.0.0.1:8000/live-stream/follow-streamer-category/api/",
        {
          streamer_id: streamer_id,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("follow", response.data.data);
        setFollow(response.data.data);
      })
      .catch((error) => {
        console.error("Error follow data:", error);
        alert(error.response.data);
      });
  }, []);

  return (
    <Box sx={{ marginTop: "20px", padding: "5px" }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Paper elevation={1}>
            {/* video player  */}
            <VideoStream />
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
                      {streamerChannelData.channel_display_name
                        ? streamerChannelData.channel_display_name
                        : streamerChannelData.streamer_username}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white" }}>
                      {streamerStreamData.stream_title
                        ? streamerStreamData.stream_title
                        : "Stream Title not given"}
                    </Typography>
                    <Typography variant="h6" sx={{ color: "white" }}>
                      Category:{" "}
                      {streamerStreamData.category
                        ? streamerStreamData.category
                        : "Category name not given"}
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
                About{" "}
                {streamerChannelData.channel_display_name
                  ? streamerChannelData.channel_display_name
                  : streamerChannelData.streamer_username}
                <VerifiedIcon />
              </Typography>
              <Typography variant="body2" color="white">
                <b>
                  {streamerChannelData.total_followers
                    ? streamerChannelData.total_followers
                    : "0"}
                </b>{" "}
                followers
              </Typography>
              <br />
              <Typography variant="h6" color="white">
                Bio:
              </Typography>
              <Typography variant="text2" color="white">
                {streamerChannelData.bio
                  ? streamerChannelData.bio
                  : "No Bio Data Available"}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} padding={2}>
              {socialLink.fb_link ? (
                <Button
                  variant="outlined"
                  sx={{ color: "white" }}
                  startIcon={<FacebookIcon />}
                >
                  <Link
                    href={socialLink.fb_link}
                    underline="none"
                    color="white"
                  >
                    Facebook
                  </Link>
                </Button>
              ) : null}
              {socialLink.yt_link ? (
                <Button
                  variant="outlined"
                  sx={{ color: "white" }}
                  startIcon={<YouTubeIcon />}
                >
                  <Link
                    href={socialLink.yt_link}
                    underline="none"
                    color="white"
                  >
                    YouTube
                  </Link>
                </Button>
              ) : null}
              {socialLink.ig_link ? (
                <Button
                  variant="outlined"
                  sx={{ color: "white" }}
                  startIcon={<InstagramIcon />}
                >
                  <Link
                    href={socialLink.ig_link}
                    underline="none"
                    color="white"
                  >
                    Instagram
                  </Link>
                </Button>
              ) : null}
              {socialLink.tiktok_link ? (
                <Button
                  variant="outlined"
                  sx={{ color: "white" }}
                  startIcon={<TikTokIcon />}
                >
                  <Link
                    href={socialLink.tiktok_link}
                    underline="none"
                    color="white"
                  >
                    TikTok
                  </Link>
                </Button>
              ) : null}
              {socialLink.x_link ? (
                <Button
                  variant="outlined"
                  sx={{ color: "white" }}
                  startIcon={<TwitterIcon />}
                >
                  <Link href={socialLink.x_link} underline="none" color="white">
                    Twitter
                  </Link>
                </Button>
              ) : null}
            </Stack>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={8}>
                <Stack direction="column">
                  <Typography variant="h5" sx={{ color: "white" }}>
                    Hi,
                  </Typography>
                  <Typography variant="h5" sx={{ color: "white" }}>
                    My name is{" "}
                    {streamerChannelData.channel_display_name
                      ? streamerChannelData.channel_display_name
                      : streamerChannelData.streamer_username}
                  </Typography>
                  <Typography
                    variant="text"
                    sx={{ color: "white", marginTop: "20px" }}
                  >
                    {streamerChannelData.streamer_about_1
                      ? streamerChannelData.streamer_about_1
                      : "No Data Available"}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                {streamerChannelData.channel_banner_picture ? (
                  <img style={{ width: "50%" }} src={mickeyMouse} alt="" />
                ) : (
                  <img
                    style={{ width: "50%" }}
                    src={streamerChannelData.channel_banner_picture}
                    alt=""
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                {streamerChannelData.channel_display_name ? (
                  <img style={{ width: "50%" }} src={mickeyMouse} alt="" />
                ) : (
                  <img
                    style={{ width: "50%" }}
                    src={streamerChannelData.channel_display_name}
                    alt=""
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={8}>
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
                    {streamerChannelData.streamer_about_2
                      ? streamerChannelData.streamer_about_2
                      : "No Data Available"}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Stream;
