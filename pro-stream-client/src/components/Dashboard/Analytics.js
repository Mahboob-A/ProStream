import React, { useEffect } from "react";
import axios from "axios";
import { getToken } from "../../services/LocalStorageService";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";

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

  const [sms, setSms] = React.useState("");
  const handleChange = (e) => {
    setSms(e.target.value);
  };
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (analytics.username) {
      axios
        .post(
          "http://127.0.0.1:8000/dashboard/streamer-analytics/",
          { username: analytics.username, message: sms },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("SMS sent", response.data.data);
          setSuccess(response.data.data);
          setError("");
        })
        .catch((error) => {
          console.error("SMS error:", error);
          setError(error.response.data.data);
          setSuccess("");
        });
    } else {
      setError("No tip received yet");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "gray",
        width: "400px",
        height: "320px",
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
      <form action="" onSubmit={handleSubmit}>
        {error && (
          <Alert severity="error" sx={{ marginY: "2px" }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ marginY: "2px" }}>
            {success}
          </Alert>
        )}
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
          value={sms}
          onChange={handleChange}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          submit
        </Button>
      </form>
    </Box>
  );
};

export default Analytics;
