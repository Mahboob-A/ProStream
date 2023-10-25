import React from "react";
import HeadPart from "./HeadPart";
import Playlists from "./Playlists";
import Gaming from "./Gaming";
import { Box } from "@mui/material";

const AllStream = () => {
  return (
    <Box>
      {/* main part use  */}
      <HeadPart />
      <Playlists />
      <Gaming />
    </Box>
  );
};

export default AllStream;
