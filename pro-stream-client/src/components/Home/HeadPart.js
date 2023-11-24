import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import stream1 from "../../Images/NotStream/stream-1.jpg";
import stream2 from "../../Images/NotStream/stream-2.jpg";
import stream3 from "../../Images/NotStream/stream-3.jpg";
import stream4 from "../../Images/NotStream/stream-4.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HeadPart = () => {
  const navigate = useNavigate();
  const [currentStream, setCurrentStream] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // runing streaming info
      try {
        const response = await axios.get(
          "https://mahboob-alam.tech/token/stream-temp-data/api/"
        );

        // console.log("user data", response.data.data);
        setCurrentStream(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = async (channel_name, streamer_id) => {
    // console.log("streamer_id", streamer_id);
    // localStorage.setItem("streamer_id", streamer_id);
    localStorage.setItem("streamer_id", streamer_id);

    try {
      // get hosting video info
      let res = await fetch(
        `https://mahboob-alam.tech/token/get-token-for-viewer/api/?channel=${channel_name}`
      );

      let data = await res.json();
      // console.log("User Stream:", data);

      let uid = data.uid;
      let token = data.token;
      let channel = data.channel;

      sessionStorage.setItem("uid", uid);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("channel", channel);
      // here we need username of user
      // let userName = e.target.username.value;
      // sessionStorage.setItem("username", userName);

      navigate("/video");
    } catch (error) {
      console.error("Error User Stream:", error);
    }
  };

  // console.log(currentStream[0]?.thumbnail);

  return (
    <Box>
      <Grid container alignItems="center">
        <Grid item xs={12} md={7}>
          {!currentStream[0]?.thumbnail ? (
            <img style={{ width: "100%" }} src={stream1} alt="" />
          ) : (
            <img
              style={{ width: "100%" }}
              src={currentStream[0]?.thumbnail}
              alt=""
              onClick={() =>
                handleClick(
                  currentStream[0]?.channel_name,
                  currentStream[0]?.streamer_id
                )
              }
            />
          )}
        </Grid>
        <Grid item xs={12} md={5}>
          <Grid container>
            <Grid item>
              {!currentStream[1]?.thumbnail ? (
                <img style={{ width: "100%" }} src={stream2} alt="" />
              ) : (
                <img
                  style={{ width: "100%" }}
                  src={currentStream[1]?.thumbnail}
                  alt=""
                  onClick={() =>
                    handleClick(
                      currentStream[1]?.channel_name,
                      currentStream[1]?.streamer_id
                    )
                  }
                />
              )}
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item xs={12} md={6}>
                  {!currentStream[2]?.thumbnail ? (
                    <img style={{ width: "100%" }} src={stream3} alt="" />
                  ) : (
                    <img
                      style={{ width: "100%" }}
                      src={currentStream[2]?.thumbnail}
                      alt=""
                      onClick={() =>
                        handleClick(
                          currentStream[2]?.channel_name,
                          currentStream[2]?.streamer_id
                        )
                      }
                    />
                  )}
                </Grid>

                <Grid item xs={12} md={6}>
                  {!currentStream[3]?.thumbnail ? (
                    <img style={{ width: "100%" }} src={stream4} alt="" />
                  ) : (
                    <img
                      style={{ width: "100%" }}
                      src={currentStream[3]?.thumbnail}
                      alt=""
                      onClick={() =>
                        handleClick(
                          currentStream[3]?.channel_name,
                          currentStream[3]?.streamer_id
                        )
                      }
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeadPart;
