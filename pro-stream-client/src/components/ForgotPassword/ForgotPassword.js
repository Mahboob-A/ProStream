import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import signinbg from "../../Images/signinbg.jpg";
import Footer from "../Common/Footer";

const ForgotPassword = () => {
  const [credential, setCredential] = useState(""); // State for email
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make an Axios POST request to your login endpoint
      const response = await axios.post(
        "https://mahboob-alam.tech/auth/reset-password-email-otp/",
        {
          credential,
        }
      );
      console.log(response.data);

      if (response.data.status === "success") {
        localStorage.setItem("credential", credential);
        alert("Email send successfully. Please, check your email.");
        navigate("/otp-validation");
      } else {
        setError("User not found. Please check your email/username.");
      }
    } catch (error) {
      // console.error("Login failed", error);
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
    <Box>
      <Toolbar />
      <Box
        sx={{
          backgroundImage: `url(${signinbg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          opacity: ".9",
          height: "55vh",
          width: "100%",
        }}
      >
        <Container component="main" maxWidth="xs" sx={{ padding: 4 }}>
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
            <Typography variant="h6">
              Getting back your ProStream account
            </Typography>
            <Typography variant="body">
              Tell us some information about your account.
            </Typography>
            {error && (
              <Alert severity="error" sx={{ marginY: "2px" }}>
                <AlertTitle>Error</AlertTitle>
                {error}
              </Alert>
            )}
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
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
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default ForgotPassword;
