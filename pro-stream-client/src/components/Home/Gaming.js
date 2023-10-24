import { Box, Divider, Grid, Typography } from "@mui/material";
import img1 from "../../Images/game1.png";
import img2 from "../Images/game2.png";
import img3 from "../Images/game3.png";
import img4 from "../Images/game4.png";

const Gaming = () => {
  return (
    <Box>
      <Typography variant="h4" color="white">
        Gaming
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

export default Gaming;
