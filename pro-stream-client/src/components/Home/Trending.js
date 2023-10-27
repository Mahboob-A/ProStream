import { Box, Divider, Grid, Typography } from "@mui/material";
import img1 from "../../Images/game1.png";
import img2 from "../../Images/game2.png";
import img3 from "../../Images/game3.png";
import img4 from "../../Images/game4.png";

const treadingItems = [
  {
    id: 1,
    img: "https://i.ibb.co/Yp7PGpG/fortnite.png",
  },
  {
    id: 2,
    img: "https://i.ibb.co/FK4Z24b/racing.png",
  },
  {
    id: 3,
    img: "https://i.ibb.co/ZJMTjnB/Shooter.png",
  },
  {
    id: 4,
    img: "https://i.ibb.co/hmBMhyR/simulations.png",
  },
  {
    id: 5,
    img: "https://i.ibb.co/qNkKkpV/MOBA.png",
  },
  {
    id: 6,
    img: "https://i.ibb.co/cw8YZJY/Strategy.png",
  },
  {
    id: 7,
    img: "https://i.ibb.co/pjz1Q6v/battle-royale.png",
  },
  {
    id: 8,
    img: "https://i.ibb.co/PCPMtVC/board-games.png",
  },
  {
    id: 9,
    img: "https://i.ibb.co/FqJ0ZkD/chess.png",
  },
  {
    id: 10,
    img: "https://i.ibb.co/p1xyMsb/irl.png",
  },
];

const Trending = () => {
  return (
    <Box>
      <Typography variant="h4" color="white">
        Trending
      </Typography>
      <Divider sx={{ background: "red", height: "3px" }} />

      <Grid container spacing={1} padding={1}>
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
        {treadingItems.map((text, index) => (
          <Grid item spacing={1} padding={1}>
            <img
              style={{ width: "270px", height: "160px" }}
              src={text.img}
              alt=""
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Trending;
