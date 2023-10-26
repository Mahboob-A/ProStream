import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import signinbg from "../../Images/signinbg.jpg";
import NavBar from "../Common/NavBar";
import { Toolbar } from "@mui/material";
import { useState } from "react";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const ConfirmOTP = () => {
  const [credential, setCredential] = useState(""); // State for email or username
  const [otp, setOtp] = useState(); // State for email or username
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make an Axios POST request to your login endpoint
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login-with-otp-email-confirmation/",
        {
          credential,
          otp,
        }
      );

      // Handle the response (e.g., set user token or redirect to a dashboard)
      console.log("Login successful", response.data);
      if (response.data.status == "success") {
        navigate("/");
      }
    } catch (error) {
      // Handle any errors (e.g., display an error message)
      console.error("Login failed", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <NavBar />
      <Toolbar />
      <Box
        sx={{
          backgroundImage: `url(${signinbg})`,
          backgroundRepeat: `no-repeat`,
          opacity: ".9",
          height: "100%",
          width: "100%",
        }}
      >
        <Container component="main" maxWidth="xs" sx={{ padding: 4 }}>
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">Confirm Your OTP</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address or User Name"
                name="email"
                autoComplete="email"
                autoFocus
                color="secondary"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="otp"
                label="Enter your OTP"
                name="otp"
                autoComplete="number"
                autoFocus
                color="secondary"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="secondary"
              >
                Sign In
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ConfirmOTP;
