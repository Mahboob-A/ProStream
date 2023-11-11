import { Box, Stack } from "@mui/material";
import React, { useEffect } from "react";
import mic from "../../static/images/mic.svg";
import camera from "../../static/images/camera.svg";
import leave from "../../static/images/leave.svg";
import AgoraRTC from "agora-rtc-sdk-ng";

const VideoStream2 = () => {
  useEffect(() => {
    const APP_ID = "165129b40d854d378bb66172725f9ddjoin2";
    const CHANNEL = sessionStorage.getItem("channel");
    const TOKEN = sessionStorage.getItem("token");
    let uid = Number(sessionStorage.getItem("uid"));
    let userName = sessionStorage.getItem("username");
    let localTracks = [];
    let localScreenTracks;
    let remoteUsers = {};
    let hostUid;
    let config = {
      appId: APP_ID,
      token: TOKEN,
      uid: uid,
      channel: CHANNEL,
    };
    console.log(config);
    let client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
    console.log("Outside Cliend", client);
    let streaming = false;
    let isSharingScreen = false;
    // let initiateRTC = async () => {
    //   await client.join(config.appId, config.channel, config.token, config.uid);
    //   console.log("Inside Cliend", client);
    //   // handle the remote users that are joined in the stream
    //   client.on("user-published", handleUserPublished);
    //   client.on("user-unpublished", handleStreamUnpublished);
    // };
    // initiateRTC();
    let isInitiated = false;

    // ...

    let initiateRTC = async () => {
      if (!isInitiated) {
        isInitiated = true; // Set the flag to true to prevent multiple calls

        await client.join(
          config.appId,
          config.channel,
          config.token,
          config.uid
        );
        console.log("Inside Client", client);

        // handle the remote users that are joined in the stream
        client.on("user-published", handleUserPublished);
        client.on("user-unpublished", handleStreamUnpublished);
      }
    };

    // starting the stream
    let toggleStream = async () => {
      if (!streaming) {
        streaming = true;
        document.getElementById("stream-button").innerText = "Stop Streaming"; // this gives a button to stream and un stream
        toggleVideoShare();
      } else {
        streaming = false;
        document.getElementById("stream-button").innerText = "Start Streaming";
        // stop the stream
        for (let i = 0; localTracks.length > i; i++) {
          localTracks[i].stop();
          localTracks[i].close();
        }
        await client.unpublish([localTracks[0], localTracks[1]]);
      }
    };

    // this function makes the host, and publishes the video
    let toggleVideoShare = async () => {
      client.setClientRole("host");
      hostUid = uid;
      console.log(
        "hostUid: ",
        hostUid,
        " ----- ",
        "uid: ",
        uid,
        "config.uid: ",
        config.uid
      );
      document.getElementById("video-stream").innerHTML = "";
      localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();
      let Player = `<div class="video-container" id="user-container-${uid}">
                                                <div class="video-player" id="user-${uid}"></div>
                                        </div>`;
      document
        .getElementById("video-stream")
        .insertAdjacentHTML("beforeend", Player);
      // playing this : class="video-player" id="user-${uid}
      localTracks[1].play(`user-${uid}`);
      // publish the stream / track so that other users can see the stream
      await client.publish([localTracks[0], localTracks[1]]);
    };

    // this function handles the remote users to watch the stream and listen
    let handleUserPublished = async (user, mediaType) => {
      // subscribing to the stream
      await client.subscribe(user, mediaType);
      console.log("user uid: ", user.uid, " --- ", "config.uid: ", config.uid);
      if (mediaType === "video") {
        let player = document.getElementById(`user-container-${user.uid}`);
        if (player != null) {
          player.remove();
        }
        player = `<div class="video-container" id="user-container-${user.uid}">
                                                <div class="video-player" id="user-${user.uid}"></div>
                                                </div>`;
        document
          .getElementById("video-stream")
          .insertAdjacentHTML("beforeend", player);
        user.videoTrack.play(`user-${user.uid}`);
        if (user.uid != config.uid) {
          document.getElementById("camera-button").style.display = "none";
          document.getElementById("mic-button").style.display = "none";
          document.getElementById("stream-button").style.display = "none";
        }
      }
      // set the audio
      if (mediaType === "audio") {
        user.audioTrack.play();
      }
    };

    // when a user quits the stream, remove him from the stream
    let handleStreamUnpublished = async (user) => {
      console.log("user ---- uid : ", user.uid);
      document.getElementById("video-stream").innerHTML = "";
    };
    // camera on off
    let toggleCamera = async (e) => {
      // if camera if already off, then turn on
      if (localTracks[1].muted) {
        await localTracks[1].setMuted(false);
        e.target.style.backgroundColor = "#fff";
        //e.target.classLists.add('active')
      } else {
        // turn off the camera
        await localTracks[1].setMuted(true);
        e.target.style.backgroundColor = "rgb(255, 80, 80, 1)";
        //e.target.classLists.remove('active')
      }
    };

    // mic on off
    let toggleMic = async (e) => {
      // if mic if already off, then turn on
      if (localTracks[0].muted) {
        await localTracks[0].setMuted(false);
        //e.target.classLists.add('active')
        e.target.style.backgroundColor = "#fff";
      } else {
        // turn off the mic
        await localTracks[0].setMuted(true);
        //e.target.classLists.remove('active')
        e.target.style.backgroundColor = "rgb(255, 80, 80, 1)";
      }
    };

    // screen share control
    // let toggleScreenShare = async (e) => {
    //   if (isSharingScreen) {
    //     isSharingScreen = false;
    //     await client.unpublish([localScreenTracks]);
    //     toggleVideoShare();
    //     document.getElementById("screen-share-button").innerText =
    //       "Share screen";
    //   } else {
    //     isSharingScreen = true;
    //     document.getElementById("screen-share-button").innerText =
    //       "Share camera"; // text will show
    //     localScreenTracks = AgoraRTC.createScreenAndVideoTrack();
    //     document.getElementById("video-stream").innerHTML = "";
    //     let player = document.getElementById(`user-container-${user.uid}`);
    //     if (player != null) {
    //       player.remove();
    //     }
    //     player = `<div class="video-container" id="user-container-${user.uid}">
    //                                             <div class="video-player" id="user-${user.uid}"></div>
    //                                             </div>`;
    //     document
    //       .getElementById("video-stream")
    //       .insertAdjacentHTML("beforeend", player);
    //     // screen share is played
    //     localScreenTracks.videoTrack.play(`user-${user.uid}`);
    //     // unpublishing the streaming
    //     await client.unpublish([localTracks[0], localTracks[1]]);
    //     // publishing the screen sharing
    //     await client.publish([localScreenTracks]);
    //   }
    // };
    // handle when the user clicks exit buttom
    let handleUserLeave = async () => {
      for (let i = 0; localTracks.length > i; i++) {
        localTracks[i].stop();
        localTracks[i].close();
      }
      await client.leave();
      window.open("/", "_self");
    };
    // ------------------------------------
    document
      .getElementById("stream-button")
      .addEventListener("click", toggleStream);
    // document
    //   .getElementById("screen-share-button")
    //   .addEventListener("click", toggleScreenShare);
    document
      .getElementById("leave-button")
      .addEventListener("click", handleUserLeave);
    document
      .getElementById("camera-button")
      .addEventListener("click", toggleCamera);
    document.getElementById("mic-button").addEventListener("click", toggleMic);
    initiateRTC();
  }, []);

  // Example control buttons click handlers
  const handleMicButtonClick = () => {
    // Handle microphone button click action
  };

  const handleCameraButtonClick = () => {
    // Handle camera button click action
  };

  const handleLeaveButtonClick = () => {
    // Handle leave button click action
  };

  const handleStreamButtonClick = () => {
    // Handle stream button click action
  };

  return (
    <Box sx={{ backgroundColor: "red" }}>
      <section id="room-name-wrapper">
        <p>
          Room Name: <span id="room-name"></span>
        </p>
      </section>
      <section
        id="video-stream"
        style={{
          display: "flex",
          flexWrap: "wrap",
          height: "300px",
          width: "300px",
          backgroundColor: "orange",
        }}
      >
        {/* Video streaming content */}
      </section>
      <section className="stream-actions" id="controls-wrapper">
        <Stack direction="row">
          <div className="icon-wrapper">
            <img
              className="control-icon"
              id="mic-button"
              src={mic}
              height="50px"
              width="50px"
              // onClick={handleMicButtonClick}
            />
          </div>
          <div className="icon-wrapper">
            <img
              className="control-icon"
              id="camera-button"
              height="50px"
              width="50px"
              src={camera}
              // onClick={handleCameraButtonClick}
            />
          </div>
          <div className="icon-wrapper">
            <img
              className="control-icon"
              id="leave-button"
              height="50px"
              width="50px"
              src={leave}
              // onClick={handleLeaveButtonClick}
            />
          </div>
          <div className="icon-wrapper">
            <button
              className="control-icon"
              id="stream-button"
              // onClick={handleStreamButtonClick}
            >
              Pause/Start
            </button>
          </div>
        </Stack>
      </section>
    </Box>
  );
};

export default VideoStream2;
