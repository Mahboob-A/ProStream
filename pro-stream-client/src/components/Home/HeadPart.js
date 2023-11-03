import React from "react";
import { Box, Grid } from "@mui/material";
import stream1 from "../../Images/Stream/main_stream2.jpg";
import stream2 from "../../Images/Stream/main_stream.jpg";
import stream3 from "../../Images/Stream/showgunners.jpg";
import stream4 from "../../Images/Stream/stream2.png";
import { Link } from "react-router-dom";

const HeadPart = () => {
  return (
    <Box>
      <Grid container alignItems="center">
        <Grid item xs={12} md={7}>
          <Link to="video/1234">
            <img style={{ width: "100%" }} src={stream1} alt="" />
          </Link>
        </Grid>
        <Grid item xs={12} md={5}>
          <Grid container>
            <Grid item>
              <Grid container>
                <Link to="video/1234">
                  <img style={{ width: "100%" }} src={stream2} alt="" />
                </Link>
              </Grid>
            </Grid>
            <Grid container item>
              <Grid item xs={12} md={6}>
                <Link to="video/1234">
                  <img style={{ width: "100%" }} src={stream3} alt="" />
                </Link>
              </Grid>
              <Grid item xs={12} md={6}>
                <Link to="video/1234">
                  <img style={{ width: "100%" }} src={stream4} alt="" />
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeadPart;
