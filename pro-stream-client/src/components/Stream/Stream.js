import { Box, Grid } from "@mui/material";
import React from "react";
import Video from "./Video";
import Chat from "./Chat";

const Stream = () => {
  return (
    <Box>
      <Grid container>
        <Video />
        <Chat />
      </Grid>
    </Box>
  );
};

export default Stream;
