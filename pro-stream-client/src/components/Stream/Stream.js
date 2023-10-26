import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import Video from "./Video";
import Chat from "./Chat";
import MoreVert from "@mui/icons-material/MoreVert";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";

const Stream = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ marginTop: "20px", padding: "5px" }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <Paper elevation={1}>
            <iframe
              width="100%"
              height="360"
              src="https://www.youtube.com/embed/xjMP0hspNLE"
              title="Video Player"
              allowFullScreen
            ></iframe>
          </Paper>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Avatar
                sx={{ height: "70px", width: "70px" }}
                src="https://i.ibb.co/xHhvpZj/people-1.png"
              />
            </Grid>
            <Grid item>
              <Typography variant="h4" sx={{ color: "white" }}>
                Atiqur Rahman
              </Typography>
              <Typography variant="body" sx={{ color: "white" }}>
                [Drops] New battle item inventory
              </Typography>
              <Typography variant="h6" sx={{ color: "white" }}>
                Category name
              </Typography>
              <Typography variant="body" sx={{ color: "white" }}>
                tag1
              </Typography>{" "}
              <Typography variant="body" sx={{ color: "white" }}>
                tag2
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{ marginRight: "5px" }}
                startIcon={<AddReactionOutlinedIcon />}
              >
                React
              </Button>
              <Button
                variant="contained"
                sx={{ marginRight: "5px" }}
                startIcon={<FavoriteBorderIcon />}
              >
                Follow
              </Button>
              <Button variant="contained" startIcon={<StarBorderIcon />}>
                Subscribe
              </Button>
              <IconButton
                aria-label="more"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onChange={handleClick}
              >
                <MoreVert sx={{ color: "white" }} />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                sx={{ marginTop: "5px" }}
              >
                <MenuItem onChange={handleClose}>Report Live Stream</MenuItem>
                <MenuItem onChange={handleClose}>Report Someting Else</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>

        {/*  Chat Page */}
        <Grid item xs={12} md={4}>
          <Typography sx={{ color: "white", textAlign: "center" }} variant="h4">
            Stream Chat
          </Typography>
          <Paper elevation={3} sx={{ height: "400px" }}>
            <Typography variant="body">Hi</Typography>
            <br />
            <Typography variant="body">Hello</Typography>
            <br />
            <Typography variant="body">How are you?</Typography>
            <br />
            <Typography variant="body">
              I am fine by the grace of allah. And you?
            </Typography>
            <br />
          </Paper>
          <Box paddingY={2} alignItems="center">
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ background: "white", width: "400px", marginRight: "10px" }}
            />
            <Button
              variant="contained"
              endIcon={<SendIcon sx={{ width: "50px", height: "40px" }} />}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Stream;
