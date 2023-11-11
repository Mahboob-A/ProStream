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
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";
import { getToken, storeToken } from "../../services/LocalStorageService";
import { setUserToken } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import Footer from "../Common/Footer";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const defaultTheme = createTheme();

const ConfirmOTP = () => {
  const [otp, setOtp] = useState(); // State for email or username
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const credential = localStorage.getItem("credential");
      console.log(credential);
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
      if (response.data.status === "success") {
        storeToken(response.data.token);
        // set user token in redux store
        let { access_token } = getToken();
        dispatch(setUserToken({ access_token: access_token }));
        alert("You are successfully login. Go to home page.");
        navigate("/");
        // after verifying email using credential we will remove credential from localstorage
        localStorage.removeItem("credential");
        // window.location.reload();
      } else {
        setError("Please, provide right OTP.");
      }
    } catch (error) {
      // console.error("Login failed", error);
      if (error.response && error.response.data && error.response.data.data) {
        setError(error.response.data.data);
      }
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
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          opacity: ".9",
          height: "60vh",
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
            {error && (
              <Alert severity="error" sx={{ marginY: "3px" }}>
                <AlertTitle>error</AlertTitle>
                {error}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
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
      <Footer />
    </ThemeProvider>
  );
};

export default ConfirmOTP;
