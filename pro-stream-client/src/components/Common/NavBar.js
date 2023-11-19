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
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../Images/prostream.png";
import { useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../../services/LocalStorageService";
import { unSetUserToken } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import axios from "axios";

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
  // const { access_token } = useSelector((state) => state.auth);
  const { access_token } = getToken();

  const [UserAllInfo, setUserAllInfo] = React.useState({});
  // user data fetch
  React.useEffect(() => {
    if (!access_token) return;
    axios
      .get("http://16.171.185.111/auth/get/user-all-details/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log("user data", response.data.data);
        setUserAllInfo(response.data.data);
        // localStorage.setItem("username", response.data.data.username);
        // localStorage.setItem("email", response.data.data.email);
        // localStorage.setItem("streamer_id", response.data.data.streamer_id);
        // localStorage.setItem("is_a_user", response.data.data.is_a_user);
        // localStorage.setItem("is_a_streamer", response.data.data.is_a_streamer);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [access_token]);
  // console.log("user data", UserAllInfo);

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
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("streamer_id");
    localStorage.removeItem("is_a_user");
    localStorage.removeItem("is_a_streamer");
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
      {access_token && (
        <Box>
          {UserAllInfo?.is_a_streamer ? (
            <MenuItem onClick={handleMenuClose}>
              <Link to="/dashboard">
                <Button>Dashboard</Button>{" "}
              </Link>
            </MenuItem>
          ) : (
            <MenuItem onClick={handleMenuClose}>
              <Link to="/user-dashboard">
                <Button>Dashboard</Button>{" "}
              </Link>
            </MenuItem>
          )}
          <MenuItem onClick={handleMenuClose}>
            <Link to="/change-password">
              <Button>Change Password</Button>{" "}
            </Link>
          </MenuItem>
        </Box>
      )}
      <MenuItem onClick={handleMenuClose}>
        <Link to="/documentation">
          <Button>Documentation</Button>{" "}
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="https://github.com/Mahboob-A/ProStream">
          <Button>GitHub</Button>{" "}
        </Link>
      </MenuItem>
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
      // sx={{ marginTop: "50px" }}
    >
      {!access_token ? (
        <Box>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/signin">
              <Button
                variant="contained"
                sx={{
                  color: "white",
                  backgroundColor: "#9147ff",
                  paddingX: "10px",
                  marginRight: "5px",
                  textTransform: "capitalize",
                }}
              >
                Sign In
              </Button>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/signup">
              <Button
                variant="contained"
                sx={{
                  color: "white",
                  backgroundColor: "#CB6D85",
                  paddingX: "10px",
                  textTransform: "capitalize",
                }}
              >
                Sign Up
              </Button>
            </Link>
          </MenuItem>
        </Box>
      ) : (
        <Box>
          {UserAllInfo?.is_a_streamer ? (
            <MenuItem onClick={handleMenuClose}>
              <Link to="/stream-form">
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
                >
                  Go Live
                </Button>
              </Link>
            </MenuItem>
          ) : (
            <MenuItem onClick={handleMenuClose}>
              <Link to="/become-stream-form">
                <Button
                  variant="contained"
                  sx={{
                    color: "white",
                    backgroundColor: "#CB6D85",
                    paddingX: "10px",
                    marginRight: "5px",
                    textTransform: "capitalize",
                  }}
                >
                  Become Streamer
                </Button>
              </Link>
            </MenuItem>
          )}
          <MenuItem onClick={handleMenuClose}>
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
          {access_token && (
            <Box>
              {UserAllInfo?.is_a_streamer ? (
                <MenuItem onClick={handleMenuClose}>
                  <Link to="/dashboard">
                    <Button>Dashboard</Button>{" "}
                  </Link>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleMenuClose}>
                  <Link to="/user-dashboard">
                    <Button>Dashboard</Button>{" "}
                  </Link>
                </MenuItem>
              )}
              <MenuItem onClick={handleMenuClose}>
                <Link to="/change-password">
                  <Button>Change Password</Button>{" "}
                </Link>
              </MenuItem>
            </Box>
          )}
        </Box>
      )}
      <MenuItem onClick={handleMenuClose}>
        <Link to="/documentation">
          <Button>Documentation</Button>{" "}
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="https://github.com/Mahboob-A/ProStream">
          <Button>GitHub</Button>{" "}
        </Link>
      </MenuItem>
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
          padding={1}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Link to="/">
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
                  <Link to="/signin">
                    <Button
                      variant="contained"
                      sx={{
                        color: "white",
                        backgroundColor: "#9147ff",
                        paddingX: "10px",
                        marginRight: "5px",
                        textTransform: "capitalize",
                      }}
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button
                      variant="contained"
                      sx={{
                        color: "white",
                        backgroundColor: "#CB6D85",
                        paddingX: "10px",
                        textTransform: "capitalize",
                      }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </Box>
              ) : (
                <Box>
                  {UserAllInfo?.is_a_streamer ? (
                    <Link to="/stream-form">
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
                      >
                        Go Live
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/become-stream-form">
                      <Button
                        variant="contained"
                        sx={{
                          color: "white",
                          backgroundColor: "#CB6D85",
                          paddingX: "10px",
                          marginRight: "5px",
                          textTransform: "capitalize",
                        }}
                      >
                        Become Streamer
                      </Button>
                    </Link>
                  )}
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
        {renderMobileMenu}
        {renderMenu}
      </AppBar>
    </Box>
  );
}
