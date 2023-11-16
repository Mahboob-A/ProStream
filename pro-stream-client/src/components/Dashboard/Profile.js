import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { getToken } from "../../services/LocalStorageService";
import { setUserToken } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import UserProfile from "./UserProfile";

const Profile = () => {
  const dispatch = useDispatch();
  let { access_token } = getToken();
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }));
  }, [access_token, dispatch]);

  let streamer_id = localStorage.getItem("streamer_id");

  const [streamerData, setStreamerData] = useState({
    bio: "",
    channel_display_name: "",
    display_picture: null,
    channel_banner_picture: null,
    streamer_about_1: "",
    streamer_about_2: "",
  });
  console.log("Streamer data:", streamerData);

  useEffect(() => {
    if (streamer_id !== "") {
      // console.log("check1", access_token);
      // console.log("check2", streamerStreamData.streamer);
      axios
        .get("http://127.0.0.1:8000/dashboard/edit-channel/api/", {
          params: {
            streamer_id: streamer_id,
          },
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("val store", response);
          setStreamerData(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          alert(error.response.data);
        });
    }
  }, [streamer_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStreamerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDisplayPicture = (event) => {
    setStreamerData({
      ...streamerData,
      display_picture: event.target.files[0],
    });
  };
  const handleBannerPicture = (event) => {
    setStreamerData({
      ...streamerData,
      channel_banner_picture: event.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .patch(
        "http://127.0.0.1:8000/dashboard/edit-channel/api/",
        streamerData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("Streamer data updated successfully:", response.data);
        setStreamerData(response.data);
      })
      .catch((error) => {
        console.error("Error updating streamer data:", error);
        alert("Error updating streamer data!");
      });
  };

  return (
    <Box>
      <Grid
        container
        spacing={1}
        padding={1}
        marginTop={2}
        sx={{ backgroundColor: "black" }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Profile Picture
          </Typography>
          {streamerData.display_picture ? (
            <Avatar
              src={`http://127.0.0.1:8000/${streamerData.display_picture}`}
              alt="Profile Picture"
              sx={{ width: 150, height: 150 }}
            />
          ) : (
            <Avatar
              src="https://i.ibb.co/k81m8xT/image-1.png"
              alt="Profile Picture"
              sx={{ width: 150, height: 150 }}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Banner Picture
          </Typography>
          {streamerData.channel_banner_picture ? (
            <img
              src={`http://127.0.0.1:8000/${streamerData.channel_banner_picture}`}
              alt="Profile Picture"
              width="350px"
              height="200px"
            />
          ) : (
            <img
              src="https://i.ibb.co/rtVgz2Q/signinbg.jpg"
              alt="Profile Picture"
              width="350px"
              height="200px"
            />
          )}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" color="red">
            Streamer Username:{" "}
            {streamerData.streamer_username
              ? streamerData.streamer_username
              : "Please update your username"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Bio</Typography>
          <Typography variant="body1">
            {streamerData.bio ? streamerData.bio : "No bio available"}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Recent Streams</Typography>
          {/* Display recent streams */}
          <Typography variant="body">No Recent Stream</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Followers</Typography>
          {/* Display followers */}
          {streamerData.total_followers ? (
            <Typography variant="body">
              {streamerData.total_followers}
            </Typography>
          ) : (
            <Typography variant="body">No Followers</Typography>
          )}
          {/* You can display a list of followers here */}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">About 1</Typography>
          <Typography variant="body1">
            {streamerData.streamer_about_1
              ? streamerData.streamer_about_1
              : "No About found"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">About 2</Typography>
          <Typography variant="body1">
            {streamerData.streamer_about_2
              ? streamerData.streamer_about_2
              : "No About found"}
          </Typography>
        </Grid>
      </Grid>
      <Box>
        {/* user profile here */}
        <UserProfile />
      </Box>
      <Grid container>
        <Grid item xs={12} align="center" sx={{ backgroundColor: "red" }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Streamer Profile
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="bio"
                      fullWidth
                      name="bio"
                      value={streamerData.bio || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="channel_display_name"
                      fullWidth
                      name="channel_display_name"
                      value={streamerData.channel_display_name || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Display Picture</Typography>
                    {streamerData.display_picture ? (
                      <Avatar
                        src={`http://127.0.0.1:8000/${streamerData.display_picture}`}
                        alt="Profile Picture"
                        sx={{ width: 150, height: 150 }}
                      />
                    ) : (
                      <Typography>No display picture available</Typography>
                    )}
                    <input
                      name="display_picture"
                      type="file"
                      accept="image/*"
                      onChange={handleDisplayPicture}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Channel Banner Picture</Typography>
                    {streamerData.channel_display_name ? (
                      <img
                        src={`http://127.0.0.1:8000/${streamerData.channel_banner_picture}`}
                        alt="Profile Picture"
                        width="350px"
                        height="200px"
                      />
                    ) : (
                      <Typography>No banner picture available</Typography>
                    )}
                    <input
                      name="channel_banner_picture"
                      type="file"
                      accept="image/*"
                      onChange={handleBannerPicture}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="streamer_about_1"
                      fullWidth
                      name="streamer_about_1"
                      value={streamerData.streamer_about_1 || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="streamer_about_2"
                      fullWidth
                      name="streamer_about_2"
                      value={streamerData.streamer_about_2 || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
