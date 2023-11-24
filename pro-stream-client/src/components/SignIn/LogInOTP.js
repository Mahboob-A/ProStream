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
import { Toolbar } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { getToken } from "../../services/LocalStorageService";
import { setUserToken } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import Footer from "../Common/Footer";

const defaultTheme = createTheme();

const LogInOTP = () => {
  const [credential, setCredential] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://mahboob-alam.tech/auth/login-with-otp-email/",
        {
          credential,
        }
      );

      // console.log(response.data);
      if (response.data.status === "success") {
        localStorage.setItem("credential", credential);
        alert("Email send successfully. Please, check your email.");
        navigate("/login-with-otp-email-confirmation");
      } else {
        setError("User not found. Please check your email/username.");
      }
    } catch (error) {
      // console.error("Login failed", error);
      setError("An error occurred. Please try again later.");
    }
  };

  // after reload on this page redux state data will be present all time
  let { access_token } = getToken();
  React.useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }));
  }, [access_token, dispatch]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Toolbar />
      <Box
        sx={{
          backgroundImage: `url(${signinbg})`,
          backgroundRepeat: `no-repeat`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          opacity: ".9",
          width: "100%",
          height: "60vh",
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
            <Typography variant="h5">Sign in with OTP</Typography>
            <Typography variant="body">
              Please give your valid information
            </Typography>
            {error && (
              <Alert severity="error" sx={{ marginY: "1px" }}>
                <AlertTitle>Error</AlertTitle>
                {error}
              </Alert>
            )}
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="secondary"
              >
                Continue
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default LogInOTP;
