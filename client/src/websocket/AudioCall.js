import React, { useRef, useState } from "react";

import { socket } from "../socket/socket";

const AudioCall = () => {
  const [stream, setStream] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [yourID, setYourID] = useState("");
  const [caller, setCaller] = useState("");
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerSignal, setCallerSignal] = useState(null);
  const userAudio = useRef();
  const connectionRef = useRef();

  const userId = localStorage.getItem("currentUser")?.userId;

  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    setStream(stream);
    if (userAudio.current) {
      userAudio.current.srcObject = stream;
    }
  });

  socket.on("yourID", (id) => {
    setYourID(id);
  });

  socket.on("incomingCall", (data) => {
    setReceivingCall(true);
    setCaller(data.from);
    setCallerSignal(data.signal);
  });

  const callUser = (id) => {
    const peer = new RTCPeerConnection();
    peer.addStream(stream);

    peer.ontrack = (event) => {
      userAudio.current.srcObject = event.streams[0];
    };

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("callUser", {
          userToCall: id,
          signalData: peer.localDescription,
          from: yourID,
        });
      }
    };

    peer.createOffer().then((offer) => {
      peer.setLocalDescription(offer).then(() => {
        socket.emit("callUser", {
          userToCall: id,
          signalData: offer,
          from: yourID,
        });
      });
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.setRemoteDescription(new RTCSessionDescription(signal));
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new RTCPeerConnection();
    peer.addStream(stream);

    peer.ontrack = (event) => {
      userAudio.current.srcObject = event.streams[0];
    };

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("answerCall", {
          signal: peer.localDescription,
          to: caller,
        });
      }
    };

    peer.setRemoteDescription(new RTCSessionDescription(callerSignal));

    peer.createAnswer().then((answer) => {
      peer.setLocalDescription(answer).then(() => {
        socket.emit("answerCall", { signal: answer, to: caller });
      });
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.close();
  };

  return (
    <div>
      <audio playsInline ref={userAudio} autoPlay />
      {receivingCall && !callAccepted ? (
        <div>
          <h1>{caller} is calling...</h1>
          <button onClick={answerCall}>Answer</button>
        </div>
      ) : null}
      {callAccepted && !callEnded ? (
        <button onClick={leaveCall}>End Call</button>
      ) : null}
    </div>
  );
};

export default AudioCall;
