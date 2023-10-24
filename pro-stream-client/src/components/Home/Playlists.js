import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import img1 from "../../Images/playlist1.png";
import img2 from "../../Images/playlist1.png";
import img3 from "../../Images/playlist2.png";
import img4 from "../../Images/playlist3.png";

const Playlists = () => {
  return (
    <Box>
      <Typography variant="h4" color="white">
        Playlists
      </Typography>
      <Divider sx={{ background: "red", height: "3px" }} />

      <Grid container spacing={1} padding={2} justifyContent="space-between">
        <Grid item>
          <img style={{ width: "100%" }} src={img1} alt="" />
        </Grid>
        <Grid item>
          <img style={{ width: "100%" }} src={img2} alt="" />
        </Grid>
        <Grid item>
          <img style={{ width: "100%" }} src={img3} alt="" />
        </Grid>
        <Grid item>
          <img style={{ width: "100%" }} src={img4} alt="" />
        </Grid>
        {/* <Grid item>
        <img style={{ width: "100%" }} src={img1} alt="" />
      </Grid> */}
      </Grid>
    </Box>
  );
};

export default Playlists;
