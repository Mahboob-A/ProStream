import React from "react";
import HeadPart from "./HeadPart";
import Playlists from "./Playlists";
import Gaming from "./Gaming";
import { Box } from "@mui/material";
import Category from "./Category";
import Trending from "./Trending";

const AllStream = () => {
  return (
    <Box>
      {/* main part use  */}
      <HeadPart />
      <Category />
      <Trending />
      <Playlists />
      <Gaming />
    </Box>
  );
};

export default AllStream;
