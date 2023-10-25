import React from "react";
import {
  Avatar,
  Box,
  Button,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Link,
  Checkbox,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const ValidationPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="otp"
          label="Enter your OTP"
          name="otp"
          autoComplete="email"
          autoFocus
          color="success"
          sx={{ color: "white" }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Enter your email or user name"
          name="email"
          autoComplete="email"
          autoFocus
          color="success"
          sx={{ color: "white" }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Enter your email or user name"
          name="email"
          autoComplete="email"
          autoFocus
          color="success"
          sx={{ color: "white" }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default ValidationPage;
