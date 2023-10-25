import React from "react";
import { Grid } from "@mui/material";
import stream1 from "../../Images/stream1.png";
import stream2 from "../../Images/stream2.png";
import stream3 from "../../Images/stream3.png";
import stream4 from "../../Images/stream4.png";
import { Link } from "react-router-dom";

const HeadPart = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={7}>
          <Link to="video">
            <img style={{ width: "100%" }} src={stream1} alt="" />
          </Link>
        </Grid>
        <Grid item xs={12} md={5}>
          <Grid container>
            <Grid item container>
              <Grid item xs={12} md={12}>
                <img style={{ width: "100%" }} src={stream2} alt="" />
              </Grid>
            </Grid>
            <Grid container item>
              <Grid item xs={12} md={6}>
                <img style={{ width: "100%" }} src={stream3} alt="" />
              </Grid>
              <Grid item xs={12} md={6}>
                <img style={{ width: "100%" }} src={stream4} alt="" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default HeadPart;
