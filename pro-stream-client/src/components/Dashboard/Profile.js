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
} from "@mui/material";
import { getToken } from "../../services/LocalStorageService";
import { setUserToken } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const Profile = () => {
  const dispatch = useDispatch();
  let { access_token } = getToken();
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }));
  }, [access_token, dispatch]);

  const [streamerData, setStreamerData] = useState({
    bio: "",
    channel_display_name: "",
    display_picture: "",
    channel_banner_picture: "",
    streamer_about_1: "",
    streamer_about_2: "",
  });

  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/dashboard/edit-channel/api/", {
        headers: headers,
      })
      .then((response) => {
        console.log("Streamer data fetched:", response.data);
        setStreamerData(response.data);
      })
      .catch((error) => {
        console.log("Streamer data fetched error: ", error.response.data);
        alert("Error fetching streamer data!");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStreamerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send streamer data to the server using Axios
    axios
      .patch(
        "http://127.0.0.1:8000/dashboard/edit-channel/api/",
        streamerData,
        {
          headers: headers,
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
    <Container>
      <Grid
        container
        spacing={3}
        padding={3}
        marginTop={4}
        sx={{ backgroundColor: "black" }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Profile Picture
          </Typography>
          {streamerData.display_picture ? (
            <Avatar
              src={streamerData.display_picture}
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
          <Button variant="contained" color="primary">
            Edit Profile Picture
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Banner Picture
          </Typography>
          {streamerData.channel_banner_picture ? (
            <img
              src={streamerData.channel_banner_picture}
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

          <Button variant="contained" color="primary">
            Edit Banner Picture
          </Button>
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
          {/* You can map through recent streams and display them here */}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Followers</Typography>
          {/* Display followers */}
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
                    <img
                      src="https://i.ibb.co/k81m8xT/image-1.png"
                      alt="Profile Picture"
                      height={150}
                      width={150}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Channel Banner Picture</Typography>
                    <img
                      src="https://i.ibb.co/ccT1Mmd/stream-4.png"
                      alt="Profile Picture"
                      height="100%"
                      width="100%"
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
    </Container>
  );
};

export default Profile;
