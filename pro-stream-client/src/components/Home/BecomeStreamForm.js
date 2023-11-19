import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Container, Grid, Toolbar } from "@mui/material";
import signupbg from "../../Images/signinbg.jpg";
import { getToken } from "../../services/LocalStorageService";
import Footer from "../Common/Footer";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../features/authSlice";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const defaultTheme = createTheme();

const BecomeStreamForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  let { access_token } = getToken();
  // after reload on this page redux state data will be present all time
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }));
  }, [access_token, dispatch]);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  formData.original_user = sessionStorage.getItem("credential");
  // console.log(formData.original_user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/live-stream/create-streamer/api/",
        formData,
        { headers: headers }
      );
      console.log("Become streamer form submitted:", response.data);
      if (response.data.status === "success") {
        alert(response.data.data);
        localStorage.setItem("is_a_streamer", true);
        navigate("/");
        window.location.reload();
      } else {
        setError(response.data.data);
      }
    } catch (error) {
      console.error("Error become streamer submitting form:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.data);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Toolbar />
      <Box
        sx={{
          backgroundImage: `url(${signupbg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "45vh",
          opacity: ".9",
        }}
      >
        <Container component="main" maxWidth="xs" sx={{ padding: 3 }}>
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
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  {error && (
                    <Alert severity="error">
                      <AlertTitle>error</AlertTitle>
                      {error}
                    </Alert>
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    id="first_name"
                    name="first_name"
                    label="First Name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    color="secondary"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    id="last_name"
                    name="last_name"
                    label="Last Name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    color="secondary"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, backgroundColor: "red" }}
                color="secondary"
                startIcon={<VideoCallIcon sx={{ color: "white" }} />}
              >
                Become Streamer
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default BecomeStreamForm;
