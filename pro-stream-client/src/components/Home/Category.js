import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import axios from "axios";
import { getToken } from "../../services/LocalStorageService";

const categoryItems = [
  {
    id: 0,
    img: "https://static-cdn.jtvnw.net/ttv-boxart/509658-285x380.jpg",
    categoryName: "Just Chatting",
    viewers: "242.3k",
    tag1: "FTP",
    tag2: "IRL",
    tag3: "RPG",
  },
  {
    id: 1,
    img: "https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg",
    categoryName: "League of Legends",
    viewers: "152k",
    tag1: "RPG",
    tag2: "Strategy",
    tag3: "Shooter",
  },
  {
    id: 2,
    img: "https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg",
    categoryName: "Valorant",
    viewers: "133k",
    tag1: "FTP",
    tag2: "Shooter",
    tag3: "RPG",
  },
  {
    id: 3,
    img: "https://static-cdn.jtvnw.net/ttv-boxart/511224-285x380.jpg",
    categoryName: "Apex Legends",
    viewers: "56.3k",
    tag1: "FPS",
    tag2: "Fighting",
    tag3: "RPG",
  },
  {
    id: 4,
    img: "https://static-cdn.jtvnw.net/ttv-boxart/29068_IGDB-285x380.jpg",
    categoryName: "Sudden Attack",
    viewers: "16k",
    tag1: "Action",
    tag2: "Shooter",
    tag3: "RPG",
  },
  {
    id: 5,
    img: "https://static-cdn.jtvnw.net/ttv-boxart/489297_IGDB-285x380.jpg",
    categoryName: "Lords of the Fallen",
    viewers: "6k",
    tag1: "Action",
    tag2: "Game",
    tag3: "RPG",
  },
  {
    id: 6,
    img: "https://static-cdn.jtvnw.net/ttv-boxart/515024-285x380.jpg",
    categoryName: "Diablo IV",
    viewers: "46k",
    tag1: "Action",
    tag2: "Horror",
    tag3: "RPG",
  },
  {
    id: 7,
    img: "https://i.ibb.co/Yp7PGpG/fortnite.png",
    categoryName: "Fortnite",
    viewers: "46k",
    tag1: "Action",
    tag2: "Horror",
    tag3: "RPG",
  },
  {
    id: 8,
    img: "https://i.ibb.co/FK4Z24b/racing.png",
    categoryName: "Racing",
    viewers: "46k",
    tag1: "Action",
    tag2: "Horror",
    tag3: "RPG",
  },
  {
    id: 9,
    img: "https://i.ibb.co/ZJMTjnB/Shooter.png",
    categoryName: "Shooter",
    viewers: "46k",
    tag1: "Action",
    tag2: "Horror",
    tag3: "RPG",
  },
  {
    id: 10,
    img: "https://i.ibb.co/hmBMhyR/simulations.png",
    categoryName: "Simulation",
    viewers: "46k",
    tag1: "Action",
    tag2: "Horror",
    tag3: "RPG",
  },
  {
    id: 11,
    img: "https://i.ibb.co/qNkKkpV/MOBA.png",
    categoryName: "MOBA",
    viewers: "46k",
    tag1: "Action",
    tag2: "Horror",
    tag3: "RPG",
  },
  {
    id: 12,
    img: "https://i.ibb.co/cw8YZJY/Strategy.png",
    categoryName: "Strategy",
    viewers: "46k",
    tag1: "Action",
    tag2: "Horror",
    tag3: "RPG",
  },
  {
    id: 13,
    img: "https://i.ibb.co/pjz1Q6v/battle-royale.png",
    categoryName: "Battle Royale",
    viewers: "46k",
    tag1: "Action",
    tag2: "Horror",
    tag3: "RPG",
  },
  {
    id: 14,
    img: "https://i.ibb.co/PCPMtVC/board-games.png",
    categoryName: "Board Games",
    viewers: "46k",
    tag1: "Action",
    tag2: "Horror",
    tag3: "RPG",
  },
  {
    id: 15,
    img: "https://i.ibb.co/FqJ0ZkD/chess.png",
    categoryName: "Chess",
    viewers: "46k",
    tag1: "Action",
    tag2: "Horror",
    tag3: "RPG",
  },
  {
    id: 16,
    img: "https://i.ibb.co/p1xyMsb/irl.png",
    categoryName: "IRL",
    viewers: "126k",
    tag1: "Action",
    tag2: "Horror",
    tag3: "RPG",
  },
  {
    id: 17,
    img: "https://static-cdn.jtvnw.net/ttv-boxart/493057-285x380.jpg",
    categoryName: "PUBG:BATTLEGROUNDS",
    viewers: "46k",
    tag1: "Action",
    tag2: "Horror",
    tag3: "RPG",
  },
];

const Category = () => {
  const [allCategory, setAllCategory] = React.useState([]);
  const { access_token } = getToken();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://mahboob-alam.tech/live-stream/get-categories/api/"
        );
        console.log(response.data.data);
        setAllCategory(response.data.data);
      } catch (error) {
        console.error("Error category data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Box>
      <Typography variant="h4" color="white">
        Categories
      </Typography>
      <Divider sx={{ background: "red", height: "3px" }} />

      {/* <Grid container spacing={1} padding={2} justifyContent="space-between"> */}
      <Grid
        container
        spacing={0}
        padding={1}
        rowSpacing={1}
        // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        columnSpacing={1}
        // columns={{ xs: 4, sm: 8, md: 12 }}
        columns={12}
      >
        {allCategory?.map((text, index) => (
          <Grid item key={text.id} xs={12} sm={4} lg={3} xl={2}>
            <Card
              sx={{
                backgroundColor: "black",
                //   border: "1px solid gray",
                padding: "0",
              }}
            >
              <CardContent>
                <img
                  style={{ width: "230px", height: "310px" }}
                  src={text.image_url}
                  alt={text.categoryName}
                />
                <Typography sx={{ fontSize: 17, color: "white" }}>
                  {text.name}
                </Typography>
                <Typography
                  sx={{ my: 1, color: "white", fontSize: 14 }}
                  color="text.secondary"
                >
                  {text.total_followers} viewers
                </Typography>
                <Typography variant="text" sx={{ color: "white" }}>
                  <Button
                    variant="contained"
                    sx={{
                      paddingY: "1px",
                      paddingX: "2px",
                    }}
                    color="primary"
                    href={`/directory/tags/${text.tag1}`}
                  >
                    {text.tag1}
                  </Button>
                </Typography>{" "}
                <Typography variant="text">
                  <Button
                    variant="contained"
                    sx={{
                      paddingY: "1px",
                      paddingX: "2px",
                    }}
                    color="secondary"
                    href={`/directory/tags/${text.tag2}`}
                  >
                    {text.tag2}
                  </Button>
                </Typography>{" "}
                {/* <Typography variant="text">
                  <Button
                    variant="contained"
                    sx={{
                      paddingY: "1px",
                      paddingX: "2px",
                    }}
                    color="warning"
                    href={`/directory/tags/${text.tag3}`}
                  >
                    {text.tag3}
                  </Button>
                </Typography> */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Category;
