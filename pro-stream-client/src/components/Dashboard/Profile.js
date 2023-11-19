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

  const [visibility, setVisibility] = useState(false);
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
    if (streamer_id !== null && access_token) {
      // console.log("check1", access_token);
      // console.log("check2", streamerStreamData.streamer);
      axios
        .get("http://16.171.185.111/dashboard/edit-channel/api/", {
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
        "http://16.171.185.111/dashboard/edit-channel/api/",
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
        axios
          .get("http://16.171.185.111/dashboard/edit-channel/api/", {
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
      })
      .catch((error) => {
        console.error("Error updating streamer data:", error);
        alert("Error updating streamer data!");
      });
    setVisibility(!visibility);
  };

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Box>
        {/* user profile here */}
        <UserProfile />
      </Box>
      <Box
        sx={{
          backgroundColor: "gray",
          marginTop: "20px",
          padding: 2,
          width: "700px",
          height: "100%",
          marginX: "auto",
          borderRadius: "20px",
        }}
      >
        <Grid
          container
          spacing={1}
          padding={1}
          marginTop={2}
          // sx={{ backgroundColor: "black" }}
          align="center"
        >
          <Grid item xs={12}>
            <Typography variant="h2" gutterBottom>
              Channel Information
            </Typography>
            <Typography variant="h4" gutterBottom>
              Profile Picture
            </Typography>
            {streamerData.display_picture ? (
              <Avatar
                src={`http://16.171.185.111/${streamerData.display_picture}`}
                alt="Profile Picture"
                sx={{ width: 150, height: 150 }}
              />
            ) : (
              <Typography color="orange">
                No display picture available
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Banner Picture
            </Typography>
            {streamerData.channel_banner_picture ? (
              <img
                src={`http://16.171.185.111/${streamerData.channel_banner_picture}`}
                alt="Profile Picture"
                width="350px"
                height="200px"
              />
            ) : (
              <Typography color="orange">
                No banner picture available
              </Typography>
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
          <Grid item xs={12} marginTop={1}>
            <Typography variant="h5">Bio</Typography>
            <Typography variant="body">
              {streamerData.bio ? streamerData.bio : "No bio available"}
            </Typography>
          </Grid>
          <Grid item xs={12} marginTop={1}>
            <Typography variant="h5">About 1</Typography>
            <Typography variant="body">
              {streamerData.streamer_about_1
                ? streamerData.streamer_about_1
                : "No About found"}
            </Typography>
          </Grid>
          <Grid item xs={12} marginTop={1}>
            <Typography variant="h5">About 2</Typography>
            <Typography variant="body">
              {streamerData.streamer_about_2
                ? streamerData.streamer_about_2
                : "No About found"}
            </Typography>
          </Grid>
          <Grid item xs={12} marginTop={1}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setVisibility(!visibility)}
            >
              Edit Channel
            </Button>
          </Grid>
        </Grid>

        <Grid
          container
          display={visibility ? "visible" : "none"}
          justifyContent="center"
        >
          <Grid item xs={12} align="center">
            <Card sx={{ backgroundColor: "gray", padding: 3 }}>
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
                          src={`http://16.171.185.111/${streamerData.display_picture}`}
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
                        placeholder="Upload Display Picture"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6">
                        Channel Banner Picture
                      </Typography>
                      {streamerData.channel_display_name ? (
                        <img
                          src={`http://16.171.185.111/${streamerData.channel_banner_picture}`}
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
                        placeholder="Upload Banner Picture"
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
    </Box>
  );
};

export default Profile;
