import React from "react";
import HeadPart from "./HeadPart";
import Playlists from "./Playlists";
import Gaming from "./Gaming";
import { Box } from "@mui/material";
import Category from "./Category";
import Trending from "./Trending";
import Footer from "../Common/Footer";

const AllStream = () => {
  return (
    <Box>
      {/* main part use  */}
      <HeadPart />
      <Category />
      <Trending />
      {/* <Playlists />
      <Gaming /> */}
      <Footer />
    </Box>
  );
};

export default AllStream;
