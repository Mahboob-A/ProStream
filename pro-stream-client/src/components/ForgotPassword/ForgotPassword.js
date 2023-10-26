import React, { useState } from "react";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [credential, setCredential] = useState(""); // State for email
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make an Axios POST request to your login endpoint
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/reset-password-email-otp/",
        {
          credential,
        }
      );

      // Handle the response (e.g., set user token or redirect to a dashboard)
      console.log("Email sent successful", response.data);
      if (response.data.status === "success") {
        localStorage.setItem("credential", credential);
        navigate("/otp-validation");
      } else {
        setError("User not found. Please check your email/username.");
      }
    } catch (error) {
      // Handle any errors (e.g., display an error message)
      console.error("Login failed", error);
      setError("An error occurred. Please try again later.");
    }
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //   });
  // };

  return (
    <Box
      sx={{
        marginTop: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#cccccc",
        padding: 3,
        color: "black",
        borderRadius: "10px",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h2" variant="h5">
        Getting back into your ProStream account
      </Typography>
      <Typography component="h4" variant="h5">
        Tell us some information about your account.
      </Typography>
      {error && <p className="error">{error}</p>}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Enter your email or User name"
          name="email"
          autoComplete="email"
          autoFocus
          color="secondary"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color="secondary"
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
