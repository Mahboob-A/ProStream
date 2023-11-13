import React, { useEffect } from "react";
import { Avatar, Button, Container, Grid, Typography } from "@mui/material";
import { getToken } from "../../services/LocalStorageService";
import { setUserToken } from "../../features/authSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  let { access_token } = getToken();
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }));
  }, [access_token, dispatch]);
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
    </Container>
  );
};

export default Profile;
