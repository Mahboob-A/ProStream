import React, { useEffect } from "react";
import axios from "axios";
import { getToken } from "../../services/LocalStorageService";
import { Box, Button, TextField, Typography } from "@mui/material";

const Analytics = () => {
  const { access_token } = getToken();
  const [analytics, setAnalytics] = React.useState([]);
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/dashboard/streamer-analytics/", {
        headers: headers,
      })
      .then((response) => {
        console.log("Analytics", response.data.data);
        setAnalytics(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <Box
      sx={{
        backgroundColor: "gray",
        width: "400px",
        height: "300px",
        marginX: "auto",
        marginTop: "30px",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h3">Analytics</Typography>
      <Typography variant="h6">
        Total Tip Received :{" "}
        {analytics.total_tip_recieved
          ? analytics.total_tip_recieved
          : "No tip received yet"}
      </Typography>
      <Typography variant="h6">
        Total followers :{" "}
        {analytics.follower_count
          ? analytics.follower_count
          : "No follwers yet"}
      </Typography>
      <Typography variant="h6">
        Biggest Tipper :{" "}
        {analytics.username ? analytics.username : "No tip received yet"}
      </Typography>
      <form action="" method="post">
        <TextField
          color="secondary"
          label="Say thanks and text biggest tipper"
          fullWidth
          name="text"
          sx={{
            input: {
              color: "white",
              borderRadius: "5px",
            },
            marginTop: "20px",
            marginBottom: "20px",
          }}
        />
        <Button variant="contained" color="primary" type="submit">
          submit
        </Button>
      </form>
    </Box>
  );
};

export default Analytics;
