import { Box, Toolbar } from "@mui/material";
import React from "react";
import chat from "../../Images/icons/chat.png";
import { useNavigate } from "react-router-dom";

const VideoHome = () => {
  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // window.open("/stream-check", "_blank");
    let room = e.target.room.value.trim().toUpperCase();
    let userName = e.target.username.value;
    let apiUrl;

    // Replace the following fetch with your actual API call using fetch or axios
    try {
      if (room) {
        apiUrl = `http://127.0.0.1:8000/token/get-token-for-viewer/api/?channel=${room}`;
      } else {
        apiUrl = "http://127.0.0.1:8000/token/get-token-for-host/api/";
      }
      let response = await fetch(apiUrl);
      let data = await response.json();
      let uid = data.uid;
      let token = data.token;
      let channel = data.channel;

      sessionStorage.setItem("uid", uid);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("channel", channel);
      sessionStorage.setItem("username", userName);
      console.log(uid, "-----", token, channel, userName);
      // Replace the following with React Router navigation
      // window.open("/stream-check", "_blank");
      navigate("/video");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box sx={{ width: "400px", height: "400px" }} marginX="auto">
      <Toolbar />
      <section id="form-container" style={{ backgroundColor: "red" }}>
        <img
          id="chat-logo"
          src={chat}
          alt="Chat Logo"
          style={{ height: "300px", width: "300px" }}
        />
        <div>
          <h2 id="chat-logo">Welcome To ProChat</h2>
          <p id="chat-logo">A Group Video Calling App</p>
        </div>

        <form id="form" onSubmit={handleFormSubmit}>
          <div className="form-field">
            <input
              type="text"
              name="username"
              placeholder="Enter your name"
              style={{ textTransform: "uppercase" }}
            />
          </div>

          <div className="form-field">
            <input
              type="text"
              name="room"
              placeholder="Enter room name"
              style={{ textTransform: "uppercase" }}
            />
          </div>

          <div className="form-field">
            <input type="submit" value="Join Live Stream" />
          </div>
        </form>
      </section>
      {/* <script>
        {`
          let form = document.getElementById('form');

          form.addEventListener('submit', ${handleFormSubmit});
        `}
      </script> */}
    </Box>
  );
};

export default VideoHome;
