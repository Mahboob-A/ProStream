import React, { useEffect } from "react";
import axios from "axios";
import { getToken } from "../../services/LocalStorageService";
import { Box, Button, Grid, TextField } from "@mui/material";

const SocialMedia = () => {
  let { access_token } = getToken();
  let streamer_id = localStorage.getItem("streamer_id");
  const [socialLink, setSocialLink] = React.useState({
    fb_link: "",
    ig_link: "",
    tiktok_link: "",
    x_link: "",
    yt_link: "",
  });
  useEffect(() => {
    if (streamer_id !== "") {
      axios
        .get("https://mahboob-alam.tech/dashboard/social-media-links/api/", {
          params: {
            streamer_id: streamer_id,
          },
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // console.log("social", response.data.data);
          setSocialLink(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          alert(error.response.data);
        });
    }
  }, [streamer_id]);
  // console.log("socialLink", socialLink);

  const handleChange = (e) => {
    setSocialLink({ ...socialLink, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form submitted:", socialLink);
    axios
      .patch(
        "https://mahboob-alam.tech/dashboard/social-media-links/api/",
        socialLink,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // console.log("User data updated successfully:", response.data);
        // setSocialLink(response.data.data);
        alert("User data updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        alert("Error updating user data!");
      });
  };
  return (
    <Box padding={2}>
      <Grid container justifyContent="center">
        <Grid
          item
          xs={6}
          align="center"
          sx={{ backgroundColor: "gray", padding: 2, borderRadius: 2 }}
        >
          {/* set profile data  */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="FB Link"
                  fullWidth
                  name="fb_link"
                  value={socialLink.fb_link || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Twiter Link"
                  fullWidth
                  name="x_link"
                  value={socialLink.x_link || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Instagram Link"
                  fullWidth
                  name="ig_link"
                  value={socialLink.ig_link || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Youtube Link"
                  fullWidth
                  name="yt_link"
                  value={socialLink.yt_link || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Tiktok Link"
                  fullWidth
                  name="tiktok_link"
                  value={socialLink.tiktok_link || ""}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SocialMedia;
