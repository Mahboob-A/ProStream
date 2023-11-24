import * as React from "react";
import { useEffect, useRef } from "react";
import AgoraRTM from "agora-rtm-sdk";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stream from "./Stream";
import SendIcon from "@mui/icons-material/Send";
import { Button, Grid, Stack, TextField } from "@mui/material";
import StartSharpIcon from "@mui/icons-material/StartSharp";
import Footer from "../Common/Footer";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { getToken } from "../../services/LocalStorageService";
import { setUserToken } from "../../features/authSlice";
import { useDispatch } from "react-redux";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const drawerWidth = 340;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
    /**
     * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
     * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
     * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
     * proper interaction with the underlying content.
     */
    position: "relative",
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  backgroundColor: "black",
  color: "white",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function SingleStream() {
  const [open, setOpen] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [count, setCount] = React.useState(0);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);
  const dispatch = useDispatch();
  // const streamer_token = sessionStorage.getItem("token");

  // // after reload on this page redux state data will be present all time
  let { access_token } = getToken();
  React.useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }));
  }, [access_token, dispatch]);

  // agora chat main logic start
  const initiateRTMRef = useRef(false);
  useEffect(() => {
    if (initiateRTMRef.current) return;
    initiateRTMRef.current = true;
    // const CHAT_APP_ID = process.env.REACT_APP_CHAT_APP_ID;
    const CHAT_APP_ID = "11103c7e74624c1fa0d6a9199c65b362";
    let CHANNEL_NAME = sessionStorage.getItem("channel");
    let UID = sessionStorage.getItem("uid");
    // console.log("chat channel and uid", CHANNEL_NAME, UID);
    let TOKEN = null;

    let client;
    let channel;

    let initRTMEngine = async () => {
      client = await AgoraRTM.createInstance(CHAT_APP_ID);
      await client.login({ uid: UID, token: TOKEN });

      channel = await client.createChannel(CHANNEL_NAME);
      await channel.join();

      // get the current user count
      getCurrentUserCount();

      // listerer
      channel.on("ChannelMessage", (message, peerId) => {
        // console.log("channel.on: ", message);
        let chat = JSON.parse(message.text);
        addMessageToChatList(chat);
      });
    };

    let form = document.getElementById("chat-form");
    let chatInput = document.getElementById("chat_body");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let chatText = chatInput.value;
      form.reset();
      submitChatFormData(chatText);
    });

    let submitChatFormData = async (message) => {
      // console.log("submitChatFormData: ", message);
      let username = localStorage.getItem("username");
      let data = {
        text: message,
        username: username,
      };
      channel.sendMessage({ text: JSON.stringify(data), type: "text" });

      // seding the message to the channel
      // channel.sendMessage({ text: message, type: "text" });

      addMessageToChatList(data);
    };

    let addMessageToChatList = async (message) => {
      let allChats = document.getElementById("chat-lists");

      // console.log("addMessageToChatList: ", message);

      function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? "pm" : "am";

        // Convert hours to 12-hour format
        hours = hours % 12 || 12;

        // Add leading zero to minutes if necessary
        minutes = minutes < 10 ? "0" + minutes : minutes;

        // Combine hours, minutes, and am/pm
        const currentTime = `${hours}:${minutes}${ampm}`;

        return currentTime;
      }

      // <strong>Chat sent </strong>
      let chatWrapper = `<div class="chat-inner">
                            <p>${
                              message.username
                                ? message.username
                                : "Unknown User"
                            }: ${getCurrentTime()}</p>
                            <p>${message.text}</p>
                          </div>`;

      allChats.insertAdjacentHTML("beforebegin", chatWrapper);
    };

    let deleteLocalStorage = () => {
      localStorage.removeItem("token");
      // localStorage.removeItem("uid");
      localStorage.removeItem("channel");
    };

    // const leaveButton = document.getElementById("leave");

    // leaveButton.addEventListener("click", function () {
    //   getCurrentUserCount();
    //   client.logout();
    //   window.open("/", "_self");
    // });
    window.addEventListener("beforeunload", deleteLocalStorage);

    async function getCurrentUserCount() {
      try {
        const membersData = await channel.getMembers();
        if (membersData) {
          const currentUserCount = membersData.length;
          setCount(currentUserCount);
          // console.log(`Channel Count: ${currentUserCount}`);
          // document.getElementById(
          //   "active-user-count"
          // ).innerText = `Active Users: ${currentUserCount}`;
        }
      } catch (error) {
        console.error("Error fetching channel members:", error);
      }
    }

    initRTMEngine();
  }, []);
  // agora chat main logic end

  // const [streamerStreamData, setStreamerStreamData] = React.useState("");
  const [streamerStreamDataAll, setStreamerStreamDataAll] = React.useState({});
  const [streamerChannelData, setStreamerChannelData] = React.useState({});
  let streamer_id = localStorage.getItem("streamer_id");
  // console.log("streamer_id from_2nd_flow", streamer_id);

  useEffect(() => {
    if (streamer_id !== null && access_token) {
      // console.log(access_token);
      // console.log("streamer_id from_2nd_flow inside", streamer_id);
      axios
        .get(
          "https://mahboob-alam.tech/live-chat/get/current-stream-details/api/",
          {
            params: {
              streamer_id: streamer_id,
            },
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          // console.log("check", response.data.data);
          // console.log("check5", response.data);
          // setStreamerStreamData(response.data.streamer_id);
          setStreamerStreamDataAll(response.data.data);
          // localStorage.setItem("streamer_id", response.data.data.streamer);
          // localStorage.setItem("stream_id", response.data.data.id);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          alert(error.response.data);
        });
    }
  }, [access_token, streamer_id]);
  // console.log("streamerStreamData", streamerStreamDataAll);

  // console.log("check3", streamerStreamData.streamer);
  // let val = streamerStreamData;
  // console.log("val", val);
  useEffect(() => {
    if (streamer_id !== null && access_token) {
      // console.log("check1", access_token);
      // console.log("check2", streamerStreamData.streamer);
      axios
        .get("https://mahboob-alam.tech/dashboard/edit-channel/api/", {
          params: {
            streamer_id: streamer_id,
          },
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // console.log("val store", response);
          setStreamerChannelData(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          alert(error.response.data);
        });
    }
  }, [streamer_id]);
  // console.log("streamerChannelData", streamerChannelData);

  const [socialLink, setSocialLink] = React.useState({});
  useEffect(() => {
    if (streamer_id !== null && access_token) {
      axios
        .get("https://mahboob-alam.tech/dashboard/social-media-links/api/", {
          params: {
            streamer_id: streamer_id,
          },
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // console.log("social", response.data.data);
          setSocialLink(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          alert(error.response.data);
        });
    }
  }, [streamer_id]);
  // console.log("socialLink", socialLink);

  const handleSentTip = async () => {
    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post(
        "https://mahboob-alam.tech/finance/tip/",
        {
          stream_id: streamerStreamDataAll.id,
          amount: amount,
          streamer_id: streamerStreamDataAll.streamer,
        },
        {
          headers: headers,
        }
      );
      // console.log("Tip Data sent:", response.data);
      alert("Tip Sent Successfully");
    } catch (error) {
      console.error("Error sending tip data:", error);
      alert(error.response.data.data);
    }
    handleModalClose();
  };

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // const params = useParams();
  // console.log(params.id);

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "fixed",
          top: "70px",
          right: "10px",
        }}
        zIndex={1}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          sx={{
            ...(open
              ? {
                  display: "none",
                }
              : {
                  color: "red",
                  display: "block",
                  marginTop: "0px",
                  marginLeft: "auto",
                  marginRight: "10px",
                  // backgroundColor: "red",
                }),
          }}
        >
          <StartSharpIcon
            sx={{ color: "white" }}
            style={{ transform: `rotate(180deg)` }}
          />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex" }}>
        {/* <CssBaseline /> */}
        <Main open={open}>
          {/* full streamer page show this section  */}
          <Stream
            streamerStreamData={streamerStreamDataAll}
            streamerChannelData={streamerChannelData}
            socialLink={socialLink}
            streamer_id={streamer_id}
          />
        </Main>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              marginTop: "70px",
              backgroundColor: "#18181b",
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawer}>
              {open === true ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <StartSharpIcon sx={{ color: "white", mr: 6 }} />
                  <Stack direction="column" textAlign="center">
                    <Typography
                      variant="h6"
                      sx={{ color: "white", textAlign: "start" }}
                    >
                      Stream Chat
                    </Typography>
                    <Typography
                      id="active-user-count"
                      variant="body1"
                      sx={{ color: "red", textAlign: "start" }}
                    >
                      Active user: {count}
                    </Typography>
                  </Stack>
                </Box>
              ) : (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerOpen}
                  sx={{
                    ...(open
                      ? {
                          display: "none",
                        }
                      : {
                          color: "red",
                          display: "block",
                          marginTop: "0px",
                          marginLeft: "auto",
                          marginRight: "10px",
                        }),
                  }}
                >
                  <StartSharpIcon
                    sx={{ color: "white", mr: 2 }}
                    style={{ transform: `rotate(180deg)` }}
                  />
                </IconButton>
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Box sx={{ height: "100%", position: "relative" }}>
            {/*  Chat Page */}
            <Box>
              <InfiniteScroll dataLength={1} height="500px">
                <Box sx={{ backgroundColor: "#eecaff", padding: 1 }}>
                  <section className="main--container">
                    <div id="chat-lists">
                      <div className="chat-inner"></div>
                    </div>
                    {/* <button id="leave">Leave</button> */}
                    {/* <h2 id="active-user-count">
                      Current Active Users: Loading...
                    </h2> */}
                  </section>
                </Box>
              </InfiniteScroll>
            </Box>
            <Box sx={{ position: "absolute", bottom: "70px" }}>
              <Grid container paddingY={2} alignItems="center" spacing={1}>
                <Grid item xs={9.5}>
                  <Modal
                    open={openModal}
                    onClose={handleModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={modalStyle}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ marginBottom: 2 }}
                      >
                        Sent Tip
                      </Typography>

                      <TextField
                        id="outlined-basic"
                        label="Amount"
                        variant="outlined"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        fullWidth
                      />
                      <br />
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ marginTop: 2 }}
                        onClick={handleSentTip}
                      >
                        Sent
                      </Button>
                    </Box>
                  </Modal>
                  <form id="chat-form">
                    <Grid container columns={9.5} spacing={1}>
                      <Grid item xs={9.5}>
                        <TextField
                          required
                          size="small"
                          name="chat_body"
                          id="chat_body"
                          variant="outlined"
                          sx={{
                            background: "white",
                            width: "100%",
                          }}
                          placeholder="Enter text"
                        />
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
                <Grid item xs={2.5}>
                  <Button
                    variant="contained"
                    onClick={handleModalOpen}
                    sx={{ padding: "1px" }}
                    endIcon={
                      <VolunteerActivismIcon
                        sx={{ width: "40px", height: "40px" }}
                      />
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Drawer>
      </Box>
      <Footer marginRightFooter={open ? "340px" : "50px"} />
    </Box>
  );
}
