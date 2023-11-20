import React, { useState, useEffect } from "react";
import {
  Container,
  CssBaseline,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Footer from "../Common/Footer";
const theme = createTheme();

const ConfirmChangePassword = ({ match }) => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    // try {
    const response = await axios.post(
      `https://mahboob-alam.tech/auth/reset-password/${match.params.encoded_uuid}/${match.params.password_token}/`,
      { password, password2 }
    );
    console.log(response);
    //   //   setSuccessMessage(response.data.data);
    //   //   setErrorMessage("");
    // } catch (error) {
    //   console.log(error);
    //   //   setSuccessMessage("");
    //   //   setErrorMessage(error.response.data.data);
    // }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
          <Typography variant="h6">Reset Your Password</Typography>
          {successMessage && (
            <Typography color="success">{successMessage}</Typography>
          )}
          {errorMessage && (
            <Typography color="error">{errorMessage}</Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="New Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Confirm New Password"
              type="password"
              value={password2}
              onChange={handlePassword2Change}
              required
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Reset Password
            </Button>
          </form>
        </Box>
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default ConfirmChangePassword;
