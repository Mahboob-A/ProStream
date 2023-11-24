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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    stream_title: "",
    go_live_notification: "",
    thumbnail: "",
    content_classification: "",
    language: "",
    follower_goals: "",
    is_previously_recorded: false,
    has_branded_content: false,
  });
  // console.log(formData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://mahboob-alam.tech/live-chat/category-crud/api/"
        );
        // console.log(response.data.data);
        setCategory(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };

    try {
      // create a stream model
      const response1 = await axios.post(
        "https://mahboob-alam.tech/live-stream/create-stream/api/",
        formData,
        { headers: headers }
      );
      // console.log("Create Stream Form submitted:", response1.data);
      localStorage.setItem("streamer_id", response1.data.data.streamer_id);

      // hosting video
      let response2 = await fetch(
        "https://mahboob-alam.tech/token/get-token-for-host/api/"
      );

      let data = await response2.json();
      // console.log("Host Stream:", data);

      let uid = data.uid;
      let token = data.token;
      let channel = data.channel;

      sessionStorage.setItem("uid", uid);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("channel", channel);
      /// here we need username of user
      // let userName = e.target.username.value;
      // sessionStorage.setItem("username", userName);

      // console.log({
      //   uid: uid,
      //   channel_name: channel,
      //   token: token,
      //   thumbnail: formData.thumbnail,
      // });

      // create stream model
      const response3 = await axios.post(
        "https://mahboob-alam.tech/token/stream-temp-data/api/",
        {
          uid: uid,
          channel_name: channel,
          token: token,
          thumbnail: formData.thumbnail,
          streamer_id: response1.data.data.streamer_id,
          username: response1.data.data.user_username,
          profile_image_url: response1.data.data.profile_image_url,
        }
      );
      // console.log("Create Stream:", response3.data);

      navigate("/video");
    } catch (error) {
      console.error("Error Stream Form:", error);
      if (error.response && error.response.data && error.response.data.data) {
        setError(error.response.data.data);
      } else {
        setError("Something went wrong.");
      }
    }
  };

  // after reload on this page redux state data will be present all time
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
                <Grid item xs={12}>
                  {error && (
                    <Alert severity="error">
                      <AlertTitle>error</AlertTitle>
                      {error}
                    </Alert>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-multiple-name-label" color="secondary">
                      Category *
                    </InputLabel>
                    <Select
                      required
                      fullWidth
                      id="category"
                      label="Category"
                      value={formData.category}
                      onChange={handleInputChange}
                      name="category"
                      color="secondary"
                      autoFocus
                    >
                      {category?.map((data) => (
                        <MenuItem key={data.id} value={data.id}>
                          {data?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
