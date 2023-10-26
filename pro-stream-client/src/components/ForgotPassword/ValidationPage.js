import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ValidationPage = () => {
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const credential = localStorage.getItem("credential");
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/reset-password-email-otp-confirmation/",
        { otp, credential, password, password2 }
      );
      console.log(response);
      if (response.data.status === "success") {
        alert("Validation successfull");
        navigate("/");
      } else {
        setError("User not found. Please check your email/username.");
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("An error occurred. Please try again later.");
    }
  };

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
      <Typography variant="h4">Please, give your information</Typography>
      {error && <p className="error">{error}</p>}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="otp"
          label="Enter your OTP"
          name="otp"
          autoComplete="off"
          autoFocus
          color="secondary"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Enter your new password"
          name="password"
          autoComplete="password"
          autoFocus
          color="secondary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password2"
          label="Enter your password again"
          name="password2"
          autoComplete="password"
          autoFocus
          color="secondary"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ mt: 3, mb: 2 }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default ValidationPage;
