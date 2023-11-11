import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/material";
import img1 from "../../Images/stream1.png";
import img2 from "../../Images/stream2.png";

const Footer = ({ marginRightFooter }) => {
  return (
    <Box padding={3} marginRight={marginRightFooter}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
            About Us
          </Typography>
          <Typography variant="text" sx={{ color: "white" }}>
            Pellentesque suscipit pellentesque luctus. Nulla vel tellus nec
            risus tempus feugiat. Donec nibh orci, sollicitudin sit amet gravida
            at, varius sit amet sem.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
            Information
          </Typography>
          <ul>
            <li style={{ color: "white" }}>About Us</li>
            <li style={{ color: "white" }}>Contact Us</li>
            <li style={{ color: "white" }}>Terms & Conditions</li>
            <li style={{ color: "white" }}>Privacy Policy</li>
            <li style={{ color: "white" }}>Press</li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
            Category
          </Typography>
          <ul>
            <li style={{ color: "white" }}>Videos</li>
            <li style={{ color: "white" }}>Gaming</li>
            <li style={{ color: "white" }}>Travel</li>
            <li style={{ color: "white" }}>Music</li>
            <li style={{ color: "white" }}>Sports</li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
            Latest Post
          </Typography>
          <Box>
            <Stack direction={{ sm: "column", md: "row" }} spacing={2}>
              <Box sx={{ width: "250px" }}>
                <img style={{ width: "100%" }} src={img1} alt="" />
              </Box>
              <Box>
                <Typography variant="text" sx={{ color: "white" }}>
                  Most funny sports moments you have ever seen
                </Typography>
              </Box>
            </Stack>
            <Stack direction={{ sm: "column", md: "row" }} spacing={2}>
              <Box sx={{ width: "250px" }}>
                <img style={{ width: "100%" }} src={img2} alt="" />
              </Box>
              <Box>
                <Typography variant="text" sx={{ color: "white" }}>
                  How to Create Simple and Effective Product Videos
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
