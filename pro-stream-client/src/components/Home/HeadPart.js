import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import stream1 from "../../Images/Stream/main_stream2.jpg";
import stream2 from "../../Images/Stream/main_stream.jpg";
import stream3 from "../../Images/Stream/showgunners.jpg";
import stream4 from "../../Images/Stream/stream2.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../services/LocalStorageService";

const HeadPart = () => {
  const [currentStream, setCurrentStream] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/token/stream-temp-data/api/"
        );
        console.log(response.data.data);
        setCurrentStream(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = async (channel_name) => {
    // console.log(channel_name);
    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };

    try {
      // hosting video
      let res = await fetch(
        `http://127.0.0.1:8000/token/get-token-for-viewer/api/?channel=${channel_name}`
      );

      let data = await res.json();
      console.log("User Stream:", data);

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

  let { access_token } = getToken();
  // useEffect(() => {
  //   dispatch(setUserToken({ access_token: access_token }));
  // }, [access_token, dispatch]);

  return (
    <Box>
      <Grid container alignItems="center">
        <Grid item xs={12} md={7}>
          {/* <Link to="/video"> */}
          {/* <img style={{ width: "100%" }} src={stream1} alt="" /> */}
          <img
            style={{ width: "100%" }}
            src={currentStream[0]?.thumbnail}
            alt=""
            onClick={() => handleClick(currentStream[0]?.channel_name)}
          />
          {/* </Link> */}
        </Grid>
        <Grid item xs={12} md={5}>
          <Grid container>
            <Grid item>
              <Grid container>
                <Link to="/video">
                  <img style={{ width: "100%" }} src={stream2} alt="" />
                </Link>
              </Grid>
            </Grid>
            <Grid container item>
              <Grid item xs={12} md={6}>
                <Link to="/video">
                  <img style={{ width: "100%" }} src={stream3} alt="" />
                </Link>
              </Grid>
              <Grid item xs={12} md={6}>
                <Link to="/video">
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
