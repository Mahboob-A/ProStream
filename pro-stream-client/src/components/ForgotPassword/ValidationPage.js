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
      otp: data.get("otp"),
      password: data.get("password"),
      password2: data.get("password2"),
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
      <Typography variant="h4">Please, give your information</Typography>
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
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password2"
          label="Enter your password again"
          name="password2"
          autoComplete="email"
          autoFocus
          color="secondary"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ mt: 3, mb: 2 }}
          href="/"
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default ValidationPage;
