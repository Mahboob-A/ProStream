import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Button, Grid, Link } from "@mui/material";
import logo from "../../Images/prostream.png";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../services/LocalStorageService";
import { unSetUserToken } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import VideoCallIcon from "@mui/icons-material/VideoCall";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const dispatch = useDispatch();

  // access access_token from redux state
  const { access_token } = useSelector((state) => state.auth);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = (e) => {
    // localStorage.removeItem("credential");
    dispatch(unSetUserToken({ access_token: null }));
    removeToken();
    navigate("/signin");
    // window.location.reload();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ marginTop: "50px" }}
    >
      <MenuItem>
        <Button href="/dashboard/profile">Profile</Button>{" "}
      </MenuItem>

      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      {access_token && (
        <MenuItem onClick={() => navigate("/change-password")}>
          Change Password
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{ marginTop: "50px" }}
    >
      {!access_token ? (
        <Box>
          <MenuItem>
            <Button
              variant="contained"
              sx={{
                color: "white",
                backgroundColor: "#9147ff",
                paddingX: "10px",
                marginRight: "5px",
                textTransform: "capitalize",
              }}
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              variant="contained"
              sx={{
                color: "white",
                backgroundColor: "#CB6D85",
                paddingX: "10px",
                textTransform: "capitalize",
              }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </MenuItem>
        </Box>
      ) : (
        <Box>
          <Button
            variant="contained"
            sx={{
              color: "#ffffff",
              backgroundColor: "red",
              paddingX: "10px",
              marginRight: "5px",
              textTransform: "capitalize",
            }}
            startIcon={<VideoCallIcon sx={{ color: "white" }} />}
            href="/stream-form"
          >
            Go Live
          </Button>
          <Button
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "#CB6D85",
              paddingX: "10px",
              marginRight: "5px",
              textTransform: "capitalize",
            }}
            onClick={() => navigate("/become-stream-form")}
          >
            Become Streamer
          </Button>
          <MenuItem>
            <Button
              variant="contained"
              sx={{
                color: "white",
                backgroundColor: "#9147ff",
                paddingX: "10px",
                textTransform: "capitalize",
              }}
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          </MenuItem>
        </Box>
      )}
      <Button href="/dashboard/profile">
        <MenuItem>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <PersonOutlineIcon />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Button>
    </Menu>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "black",
      }}
    >
      <AppBar position="fixed" sx={{ backgroundColor: "black" }}>
        <Grid
          container
          spacing={12}
          paddingX={2}
          paddingY={1}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Link href="/">
              <img style={{ width: 200 }} src={logo}></img>
            </Link>
          </Grid>
          <Grid item>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Grid>
          <Grid item>
            {/* <Box sx={{ flexGrow: 1 }} /> */}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {!access_token ? (
                <Box>
                  <Button
                    variant="contained"
                    sx={{
                      color: "white",
                      backgroundColor: "#9147ff",
                      paddingX: "10px",
                      marginRight: "5px",
                      textTransform: "capitalize",
                    }}
                    href="/signin"
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      color: "white",
                      backgroundColor: "#CB6D85",
                      paddingX: "10px",
                      textTransform: "capitalize",
                    }}
                    href="/signup"
                  >
                    Sign Up
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Button
                    variant="contained"
                    sx={{
                      color: "#ffffff",
                      backgroundColor: "red",
                      paddingX: "10px",
                      marginRight: "5px",
                      textTransform: "capitalize",
                    }}
                    startIcon={<VideoCallIcon sx={{ color: "white" }} />}
                    href="/stream-form"
                  >
                    Go Live
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      color: "white",
                      backgroundColor: "#CB6D85",
                      paddingX: "10px",
                      marginRight: "5px",
                      textTransform: "capitalize",
                    }}
                    href="/become-stream-form"
                  >
                    Become Streamer
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      color: "white",
                      backgroundColor: "#9147ff",
                      paddingX: "10px",
                      textTransform: "capitalize",
                    }}
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </Button>
                </Box>
              )}
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <PersonOutlineIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
