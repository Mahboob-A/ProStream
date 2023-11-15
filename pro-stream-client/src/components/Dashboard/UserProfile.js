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

const UserProfile = () => {
  const dispatch = useDispatch();
  let { access_token } = getToken();
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }));
  }, [access_token, dispatch]);

  const [userData, setUserData] = useState({
    email: "",
    phone_number: "",
    dob: "",
    gender: "",
    profile_picture: null,
  });
  // console.log("UserData", userData);

  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/dashboard/edit-profile/api/", {
        headers: headers,
      })
      .then((response) => {
        console.log("User data fetched:", response.data);
        setUserData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (event) => {
    setUserData({
      ...userData,
      profile_picture: event.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", userData);

    axios
      .patch("http://127.0.0.1:8000/dashboard/edit-profile/api/", userData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("User data updated successfully:", response.data);
        alert("User data updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        alert("Error updating user data!");
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
        <Grid item xs={12} align="center">
          <Avatar
            src="https://i.ibb.co/k81m8xT/image-1.png"
            alt="Profile Picture"
            sx={{ width: 150, height: 150 }}
          />
          <Typography variant="h4" gutterBottom>
            Username
          </Typography>
          <Button variant="contained" color="primary">
            Edit Profile
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Bio</Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at
            varius orci. Sed ut lobortis urna. Cras ac purus at nisi porta
            aliquam.
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
      </Grid>
      <Grid container>
        <Grid item xs={6} align="center" sx={{ backgroundColor: "red" }}>
          {/* get profile data */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                name="email"
                value={userData.email || ""}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                fullWidth
                name="phone_number"
                value={userData.phone_number || ""}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Date of Birth"
                type="date"
                fullWidth
                name="dob"
                value={userData.dob || ""}
                disabled
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  label="Gender"
                  name="gender"
                  value={userData.gender || ""}
                  disabled
                >
                  <MenuItem value="m">Male</MenuItem>
                  <MenuItem value="f">Female</MenuItem>
                  <MenuItem value="o">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Profile Picture</Typography>
              {userData.profile_picture ? (
                <Avatar alt="Profile Picture" src={userData.profile_picture} />
              ) : (
                <Typography>No profile picture available</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} align="center" sx={{ backgroundColor: "red" }}>
          {/* set profile data  */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  fullWidth
                  name="email"
                  value={userData.email || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  name="phone_number"
                  value={userData.phone_number || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Date of Birth"
                  type="date"
                  fullWidth
                  name="dob"
                  value={userData.dob || ""}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    label="Gender"
                    name="gender"
                    value={userData.gender || ""}
                    onChange={handleChange}
                  >
                    <MenuItem value="m">Male</MenuItem>
                    <MenuItem value="f">Female</MenuItem>
                    <MenuItem value="o">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Profile Picture</Typography>
                {userData.profile_picture ? (
                  <Avatar
                    alt="Profile Picture"
                    src={userData.profile_picture}
                  />
                ) : (
                  <Typography>No profile picture available</Typography>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
