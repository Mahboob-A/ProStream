import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getToken } from "../../services/LocalStorageService";
import axios from "axios";

const SingleTag = () => {
  let { tag } = useParams();
  const [allCategory, setAllCategory] = React.useState([]);
  const { access_token } = getToken();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://mahboob-alam.tech/live-stream/get-categories/api/",
          {
            params: {
              tag: tag,
            },
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(response.data.data);
        setAllCategory(response.data.data);
      } catch (error) {
        console.error("Error category data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Box>
      <Typography variant="h5" color="secondary">
        Your find tag: {tag}
      </Typography>
      <Box>
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
    </Box>
  );
};

export default SingleTag;
