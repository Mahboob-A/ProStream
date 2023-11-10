// it use for practice
import React, { useEffect, useRef } from "react";
import AgoraRTM from "agora-rtm-sdk";
import { Box } from "@mui/material";

const AgoraChat = () => {
  const initiateRTMRef = useRef(false);
  useEffect(() => {
    if (initiateRTMRef.current) return;
    initiateRTMRef.current = true;
    const CHAT_APP_ID = "11103c7e74624c1fa0d6a9199c65b362";
    let CHANNEL_NAME = sessionStorage.getItem("channel");
    // let CHANNEL_NAME = String(Math.floor(Math.random() * 232));
    let UID = sessionStorage.getItem("uid");
    // let UID = String(Math.floor(Math.random() * 232));
    console.log("chat channel and uid", CHANNEL_NAME, UID);
    let TOKEN = null;
    let username = sessionStorage.getItem("username");

    let client;
    let channel;

    let initRTMEngine = async () => {
      client = await AgoraRTM.createInstance(CHAT_APP_ID);
      await client.login({ uid: UID, token: TOKEN });

      channel = await client.createChannel(CHANNEL_NAME);
      await channel.join();

      // listerer
      channel.on("ChannelMessage", (message, peerId) => {
        console.log("channel.on: ", message);
        addMessageToChatList(message.text);
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
      console.log("submitChatFormData: ", message);

      // seding the message to the channel
      channel.sendMessage({ text: message, type: "text" });

      addMessageToChatList(message);
    };

    let addMessageToChatList = async (message) => {
      let allChats = document.getElementById("chat-lists");

      console.log("addMessageToChatList: ", message);

      // <strong>Chat sent </strong>
      let chatWrapper = `<div class="chat-inner">
                            <p>${message}</p>
                          </div>`;

      allChats.insertAdjacentHTML("beforebegin", chatWrapper);
    };

    let deleteLocalStorage = () => {
      localStorage.removeItem("token");
      // localStorage.removeItem("uid");
      localStorage.removeItem("channel");
    };

    const leaveButton = document.getElementById("leave");

    leaveButton.addEventListener("click", function () {
      client.logout();
      window.open("/", "_self");
    });
    window.addEventListener("beforeunload", deleteLocalStorage);

    initRTMEngine();
  }, []);

  return (
    <Box sx={{ backgroundColor: "gray" }}>
      <section className="main--container">
        <div id="chat-lists">
          <div className="chat-inner"></div>
        </div>
        <button id="leave">Leave</button>
        <form action="" id="chat-form">
          <input
            type="text"
            name="chat_body"
            id="chat_body"
            placeholder="enter your message"
          />
        </form>
      </section>
    </Box>
  );
};

export default AgoraChat;
