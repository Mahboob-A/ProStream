import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Toolbar,
} from "@mui/material";
import signupbg from "../../Images/signinbg.jpg";
import { getToken } from "../../services/LocalStorageService";
import { setUserToken } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Footer from "../Common/Footer";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import VideoCallIcon from "@mui/icons-material/VideoCall";

const defaultTheme = createTheme();

const BecomeStreamForm = () => {
  const [formData, setFormData] = useState({
    original_user: "",
    first_name: "",
    last_name: "",
  });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  formData.original_user = sessionStorage.getItem("credential");
  console.log(formData.original_user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://your_api_endpoint_here",
        formData
      );
      console.log("Form submitted:", response.data);
      // Add any further actions with the response data here
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle any errors here
    }
  };

  let { access_token } = getToken();
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }));
  }, [access_token, dispatch]);

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
          height: "40vh",
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
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
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
