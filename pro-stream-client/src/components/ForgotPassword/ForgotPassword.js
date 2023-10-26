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

const ForgotPassword = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
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
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h2" variant="h5">
        Getting back into your ProStream account
      </Typography>
      <Typography component="h4" variant="h5">
        Tell us some information about your account.
      </Typography>
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
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color="secondary"
          href="/otp-validation"
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
