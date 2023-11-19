import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Container from "@mui/material/Container";
import signinbg from "../../Images/signinbg.jpg";
import { useDispatch } from "react-redux";
import { getToken } from "../../services/LocalStorageService";
import { setUserToken } from "../../features/authSlice";
import Footer from "../Common/Footer";

const ValidationPage = () => {
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const credential = localStorage.getItem("credential");
      const response = await axios.post(
        "http://16.171.185.111/auth/reset-password-email-otp-confirmation/",
        { otp, credential, password, password2 }
      );
      // console.log(response);
      if (response.data.status === "success") {
        alert("Password Change Successfull");
        localStorage.removeItem("credential");
        navigate("/signin");
        // window.location.reload();
      } else {
        setError("User not found. Please check your email/username.");
      }
    } catch (error) {
      // console.error("Login failed", error);
      if (error.response && error.response.data) {
        setError(error.response.data.data);
      }
    }
  };
  // console.log(error);
  let { access_token } = getToken();
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }));
  }, [access_token, dispatch]);
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
          height: "70vh",
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
            <Typography variant="h4">Please, give your information</Typography>
            {error.non_field_errors && (
              <Alert severity="error" sx={{ marginY: "2px" }}>
                <AlertTitle>Error</AlertTitle>
                {error.non_field_errors[0]}
              </Alert>
            )}
            {error.password && (
              <Alert severity="error" sx={{ marginY: "2px" }}>
                <AlertTitle>1st Password Error</AlertTitle>
                {error.password[0]}
              </Alert>
            )}
            {error.password2 && (
              <Alert severity="error" sx={{ marginY: "2px" }}>
                <AlertTitle>2nd Password Error</AlertTitle>
                {error.password2[0]}
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
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default ValidationPage;
