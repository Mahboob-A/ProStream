import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getToken } from "../../services/LocalStorageService";
import axios from "axios";
// api : http://16.171.185.111/live-stream/get-streamer-details/api/
// streamer details. username is needed to pass. also auth token.

const SingleChannel = () => {
  let { username } = useParams();
  const { access_token } = getToken();
  const [channelInfo, setChannelInfo] = React.useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://16.171.185.111/live-stream/get-streamer-details/api/",
          {
            params: {
              username: username,
            },
          }
        );
        console.log(response.data.data);
        setChannelInfo(response.data.data);
      } catch (error) {
        console.error("Error category data:", error);
      }
    };

    fetchData();
  }, [username]);
  return (
    <Box>
      <Grid container spacing={2} padding={2}>
        {/* <Grid item xs={12}>
          <Typography variant="h3" color="white" textAlign="center">
            Current Streaming
          </Typography>
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" color="white">
            User Name: {username}
          </Typography>
          <Typography variant="h6" sx={{ color: "white" }}>
            Name: {channelInfo?.streamer.first_name}{" "}
            {channelInfo?.streamer.last_name}
          </Typography>
          <Typography variant="h6" sx={{ color: "white" }}>
            Channel Name: {channelInfo?.channel.channel_display_name}
          </Typography>
          <Box>
            <Typography variant="h5" sx={{ color: "white", marginTop: 2 }}>
              Display Picture:
            </Typography>
            {channelInfo?.channel.display_picture ? (
              <img
                src={`http://16.171.185.111/${channelInfo?.channel.display_picture}`}
                alt=""
                height="150px"
                width="150px"
              />
            ) : (
              <Typography variant="body" sx={{ color: "red" }}>
                No Display Picture Available
              </Typography>
            )}
          </Box>
          <Box>
            <Typography variant="h5" sx={{ color: "white", marginTop: 2 }}>
              Banner Picture:
            </Typography>
            {channelInfo?.channel.channel_banner_picture ? (
              <img
                src={`http://16.171.185.111/${channelInfo?.channel.channel_banner_picture}`}
                alt=""
                height="100%"
                width="100%"
              />
            ) : (
              <Typography variant="body" sx={{ color: "red" }}>
                No Channel Banner Available
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" sx={{ color: "white" }}>
            Bio:
          </Typography>
          <Typography variant="body" sx={{ color: "white" }}>
            {channelInfo?.channel.bio
              ? channelInfo?.channel.bio
              : "No Bio Available"}
          </Typography>
          <Typography variant="h5" sx={{ color: "white", marginTop: 2 }}>
            About1:
          </Typography>
          <Typography variant="body" sx={{ color: "white" }}>
            {channelInfo?.channel.streamer_about_1
              ? channelInfo?.channel.streamer_about_1
              : "No About1 Available"}
          </Typography>
          <Typography variant="h5" sx={{ color: "white", marginTop: 2 }}>
            About2:
          </Typography>
          <Typography variant="body" sx={{ color: "white" }}>
            {channelInfo?.channel.streamer_about_2
              ? channelInfo?.channel.streamer_about_2
              : "No About2 Available"}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleChannel;
