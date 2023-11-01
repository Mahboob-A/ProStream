import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "../Common/NavBar";
import signupbg from "../../Images/signinbg.jpg";
import { Toolbar } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { getToken, storeToken } from "../../services/LocalStorageService";
import { setUserToken } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import Footer from "../Common/Footer";

const defaultTheme = createTheme();

export default function SignUp() {
  const [username, setUserName] = useState(""); // State for email
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [password2, setPassword2] = useState(""); // State for password
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make an Axios POST request to your login endpoint
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/register/",
        {
          username,
          email,
          password,
          password2,
        }
      );

      // console.log(response.data);
      if (response.data.status === "success") {
        setSuccessMessage("Registration successful!");
        setErrors({});
        setEmail("");
        setUserName("");
        setPassword("");
        setPassword2("");
        // storeToken(response.data.token);
        // alert("Go to sign in page");
        // navigate("/signin");
      } else {
        setSuccessMessage("");
        setErrors(response.data.data);
      }
    } catch (error) {
      setSuccessMessage("");
      if (error.response && error.response.data) {
        setErrors(error.response.data.data);
      }
      // console.error("Registration failed", error.response.data);
      // setErrors(error.response.data);
      // console.error(error.response.data.data);
    }
  };
  // console.log(errors);
  // console.log(successMessage);
  let { access_token } = getToken();
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }));
  }, [access_token, dispatch]);
  return (
    <ThemeProvider theme={defaultTheme}>
      {/* <NavBar /> */}
      <Toolbar />
      <Box
        sx={{
          backgroundImage: `url(${signupbg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100vh",
          opacity: ".9",
        }}
      >
        <Container component="main" maxWidth="xs" sx={{ padding: 2 }}>
          {/* <CssBaseline /> */}
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
              Sign up
            </Typography>
            <Box>
              {successMessage && (
                <Alert severity="success" sx={{ marginY: "15px" }}>
                  <AlertTitle>Success</AlertTitle>
                  {successMessage}
                </Alert>
              )}
              {errors.email && (
                <Alert severity="error" sx={{ marginY: "15px" }}>
                  <AlertTitle>Error</AlertTitle>
                  {errors.email[0]}
                </Alert>
              )}
              {errors.username && (
                <Alert severity="error" sx={{ marginY: "15px" }}>
                  <AlertTitle>Error</AlertTitle>
                  {errors.username[0]}
                </Alert>
              )}
              {errors.non_field_errors && (
                <Alert severity="error" sx={{ marginY: "15px" }}>
                  <AlertTitle>Error</AlertTitle>
                  {errors.non_field_errors[0]}
                </Alert>
              )}
              {errors.password && (
                <Alert severity="error" sx={{ marginY: "15px" }}>
                  <AlertTitle>1st Password Error</AlertTitle>
                  {errors.password[0]}
                </Alert>
              )}
              {errors.password2 && (
                <Alert severity="error" sx={{ marginY: "15px" }}>
                  <AlertTitle>2nd Password Error</AlertTitle>
                  {errors.password2[0]}
                </Alert>
              )}
            </Box>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="given-name"
                    name="username"
                    required
                    fullWidth
                    id="userName"
                    label="User Name"
                    autoFocus
                    color="secondary"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="email"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    color="secondary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="new-password"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    color="secondary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="new-password"
                    required
                    fullWidth
                    name="password2"
                    label="Confirm Password"
                    type="password"
                    id="password2"
                    color="secondary"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="secondary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="secondary"
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2" color="secondary">
                    Already have an account? Sign in
                  </Link>
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
