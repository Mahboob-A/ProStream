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

const CONTENT_CLASSIFICATIONS = [
  ["general", "General Content"],
  ["family_friendly", "Family-Friendly"],
  ["education", "Educational Content"],
  ["entertainment", "Entertainment"],
  ["music", "Music"],
  ["art_culture", "Art & Culture"],
  ["news", "News & Updates"],
  ["gaming", "Gaming"],
  ["sports", "Sports"],
  ["comedy", "Comedy"],
  ["technology", "Technology"],
  ["cooking", "Cooking & Food"],
  ["travel", "Travel & Adventure"],
  ["lifestyle", "Lifestyle & Fashion"],
  ["health_fitness", "Health & Fitness"],
  ["business", "Business & Finance"],
  ["history", "History & Documentary"],
  ["science", "Science & Nature"],
  ["extreme", "Extreme Content"],
  ["nsfw", "NSFW (Not Safe For Work)"],
  ["violence", "Violence"],
  ["language", "Strong Language"],
  ["horror", "Horror"],
  ["shock", "Shock Value"],
  ["taboo", "Taboo Subjects"],
];

const StreamForm = () => {
  const [formData, setFormData] = useState({
    streamer: "",
    category: "",
    stream_title: "",
    thumbnail: "",
    go_live_notification: "",
    content_classification: "",
    language: "",
    follower_goals: 0,
    is_previously_recorded: false,
    has_branded_content: false,
    // ...add other fields from the Django model as needed
  });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

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
          height: "130vh",
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
                    id="streamer"
                    name="streamer"
                    label="Streamer"
                    value={formData.streamer}
                    onChange={handleInputChange}
                    color="secondary"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    id="category"
                    name="category"
                    label="Category"
                    value={formData.category}
                    onChange={handleInputChange}
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    id="stream_title"
                    name="stream_title"
                    label="Stream Title"
                    value={formData.stream_title}
                    onChange={handleInputChange}
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    id="thumbnail"
                    name="thumbnail"
                    label="Thumbnail URL"
                    value={formData.thumbnail}
                    onChange={handleInputChange}
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    id="go_live_notification"
                    name="go_live_notification"
                    label="Go Live Notification"
                    value={formData.go_live_notification}
                    onChange={handleInputChange}
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-multiple-name-label" color="secondary">
                      Content Classification *
                    </InputLabel>
                    <Select
                      required
                      fullWidth
                      id="content_classification"
                      label="Content Classification"
                      value={formData.content_classification}
                      onChange={handleInputChange}
                      name="content_classification"
                      color="secondary"
                    >
                      {CONTENT_CLASSIFICATIONS.map(([value, label]) => (
                        <MenuItem key={value} value={value}>
                          {label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    id="language"
                    name="language"
                    label="Language"
                    value={formData.language}
                    onChange={handleInputChange}
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    id="follower_goals"
                    name="follower_goals"
                    label="Follower Goals"
                    value={formData.follower_goals}
                    onChange={handleInputChange}
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.is_previously_recorded}
                        onChange={handleCheckboxChange}
                        name="is_previously_recorded"
                        color="secondary"
                      />
                    }
                    label="Is Previously Recorded"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.has_branded_content}
                        onChange={handleCheckboxChange}
                        name="has_branded_content"
                        color="secondary"
                      />
                    }
                    label="Has Branded Content"
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
                Go Live
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default StreamForm;
