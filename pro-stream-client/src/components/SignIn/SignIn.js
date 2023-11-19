import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import signinbg from "../../Images/signinbg.jpg";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Toolbar,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { getToken, storeToken } from "../../services/LocalStorageService";
import { setUserToken } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import Footer from "../Common/Footer";

const defaultTheme = createTheme();

export default function SignIn() {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make an Axios POST request to your login endpoint
      const response = await axios.post("http://127.0.0.1:8000/auth/login/", {
        credential,
        password,
      });
      // console.log("Login responese", response.data);

      if (response.data.status === "success") {
        // localStorage.setItem("credential", credential);
        storeToken(response.data.token);
        if (response.data.token.access) {
          axios
            .get("http://127.0.0.1:8000/auth/get/user-all-details/", {
              headers: {
                Authorization: `Bearer ${response.data.token.access}`,
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              // console.log("user data", response.data.data);
              // setUserAllInfo(response.data.data);
              localStorage.setItem("username", response.data.data.username);
              localStorage.setItem("email", response.data.data.email);
              localStorage.setItem(
                "streamer_id",
                response.data.data.streamer_id
              );
              localStorage.setItem("is_a_user", response.data.data.is_a_user);
              localStorage.setItem(
                "is_a_streamer",
                response.data.data.is_a_streamer
              );
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        }
        // set user token in redux store
        let { access_token } = getToken();
        dispatch(setUserToken({ access_token: access_token }));
        alert("Sign In Successfully complete. Now, Go to home page");
        navigate("/");
        // window.location.reload();
      } else {
        setSuccessMessage("");
        setErrors(response.data.data);
      }
    } catch (error) {
      console.error("Login failed", error.response.data);
      if (error.response && error.response.data) {
        setErrors(error.response.data.data);
      }
    }
  };
  // console.log(errors);
  // console.log(successMessage);

  // after reload on this (signin) page redux state data will be present all time
  let { access_token } = getToken();
  useEffect(() => {
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
          height: "75vh",
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
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box>
              {successMessage && (
                <Alert severity="success" sx={{ marginY: "2px" }}>
                  <AlertTitle>Success</AlertTitle>
                  {successMessage}
                </Alert>
              )}
              {errors.email && (
                <Alert severity="error" sx={{ marginY: "2px" }}>
                  <AlertTitle>Error</AlertTitle>
                  {errors.email[0]}
                </Alert>
              )}
              {errors.username && (
                <Alert severity="error" sx={{ marginY: "2px" }}>
                  <AlertTitle>Error</AlertTitle>
                  {errors.username[0]}
                </Alert>
              )}
              {errors.non_field_errors && (
                <Alert severity="error" sx={{ marginY: "2px" }}>
                  <AlertTitle>Error</AlertTitle>
                  {errors.non_field_errors[0]}
                </Alert>
              )}
              {errors.password && (
                <Alert severity="error" sx={{ marginY: "2px" }}>
                  <AlertTitle>1st Password Error</AlertTitle>
                  {errors.password[0]}
                </Alert>
              )}
              {errors.password2 && (
                <Alert severity="error" sx={{ marginY: "2px" }}>
                  <AlertTitle>2nd Password Error</AlertTitle>
                  {errors.password2[0]}
                </Alert>
              )}
            </Box>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="credential"
                label="Email Address or User Name"
                name="credential"
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                color="secondary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="secondary" />}
                    label="Remember me"
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ textTransform: "capitalize" }}
                    href="/login-with-otp"
                  >
                    Sign In With OTP
                  </Button>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="secondary"
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forgot-password">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
