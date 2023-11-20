import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
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

  const [visibility, setVisibility] = useState(false);
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
      .get("https://mahboob-alam.tech/dashboard/edit-profile/api/", {
        headers: headers,
      })
      .then((response) => {
        console.log("User data fetched:", response.data.data);
        setUserData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [access_token]);

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
      .patch(
        "https://mahboob-alam.tech/dashboard/edit-profile/api/",
        userData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("User data updated successfully:", response.data);
        alert("User data updated successfully!");
        axios
          .get("https://mahboob-alam.tech/dashboard/edit-profile/api/", {
            headers: headers,
          })
          .then((response) => {
            console.log("User data fetched:", response.data.data);
            setUserData(response.data.data);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        alert("Error updating user data!");
      });

    setVisibility(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: "gray",
        padding: 2,
        width: "600px",
        height: "100%",
        marginX: "auto",
        borderRadius: "20px",
      }}
    >
      <Grid container spacing={3} marginTop={1} align="center">
        <Grid item xs={12}>
          <Avatar
            src={userData.profile_picture ? `${userData.profile_picture}` : ""}
            alt="Profile Picture"
            sx={{ width: 150, height: 150 }}
          />
          <Typography variant="h4" gutterBottom>
            Username: {localStorage.getItem("username")}
          </Typography>
          <Typography variant="h6">
            Email: {userData.email || "Not Available"}
          </Typography>
          <Typography variant="h6">
            Date of Birth: {userData.dob || "Not Available"}
          </Typography>
          <Typography variant="h6">
            Phone: {userData.phone_number || "Not Available"}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Gender:{" "}
            {userData.gender == "m"
              ? "Male"
              : userData.gender == "f"
              ? "Female"
              : "Other"}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setVisibility(!visibility)}
          >
            Edit Profile
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        display={visibility ? "visible" : "none"}
        justifyContent="center"
        marginTop={2}
      >
        <Grid
          item
          xs={12}
          align="center"
          sx={{ backgroundColor: "gray", borderRadius: "20px" }}
          padding={3}
        >
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
                  type="number"
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
                <Avatar
                  src={
                    userData.profile_picture
                      ? `${userData.profile_picture}`
                      : ""
                  }
                  alt="Profile Picture"
                  sx={{ width: 150, height: 150 }}
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={() => setVisibility("none")}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
