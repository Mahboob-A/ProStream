import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const BecomeStreamer = () => {
  return (
    <Box>
      <Typography variant="h4" color="white" textAlign="center">
        Become Streamer
      </Typography>
      <Typography variant="h6" color="white">
        Overview:
      </Typography>
      <Typography variant="body1" color="white">
        For streaming in ProStream, the user needs to become a streamer and
        ensure that the user already has an account in ProStream. Follow these
        guidelines:
      </Typography>
      <ul>
        <li>Press the “Become Streamer” button.</li>
        <li>
          Fill up the form and user are now a steamer. Now the user can stream
          on the ProStream platform.
        </li>
      </ul>
    </Box>
  );
};

export default BecomeStreamer;
