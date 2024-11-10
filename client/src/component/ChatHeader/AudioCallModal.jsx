import profile from "../../assets/profile.png";

import React, { useRef, useState } from "react";

import { socket } from "../../socket/socket";


const AudioCallModal = ({user, isAudioCallModalVisible, setIsAudioCallModalVisible}) => {
  
  if (!isAudioCallModalVisible) return null; // Return null if modal is not visible

  const [stream, setStream] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [yourID, setYourID] = useState("");
  const [caller, setCaller] = useState("");
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerSignal, setCallerSignal] = useState(null);
  const [isCallCreated, setIsCallCreated] = useState(false);
  const userAudio = useRef();
  const connectionRef = useRef();

  const onClose = () => {
    setIsAudioCallModalVisible(false);
  };
  
  const userId = JSON.parse(localStorage.getItem("currentUser"))?.userId;

  const handleCall = (e) => {
    e.preventDefault();
    setCallAccepted(true);
  }

  const data = { from: userId, userToCall: user.userId };
  console.log(data);

  const callUser = (id) => {
    const peer = new RTCPeerConnection();
    // peer.addStream(stream);

    // peer.ontrack = (event) => {
    //   userAudio.current.srcObject = event.streams[0];
    // };

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("callUser", {
          userToCall: id,
          signalData: peer.localDescription,
          from: userId,
        });
      }
    };

    peer.createOffer().then((offer) => {
      peer.setLocalDescription(offer).then(() => {
        socket.emit("callUser", {
          userToCall: id,
          signalData: offer,
          from: userId,
        });
      });
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.setRemoteDescription(new RTCSessionDescription(signal));
    });

    connectionRef.current = peer;
  };

  // socket.emit("callUser", data);
  
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-fuchsia-100 rounded-lg p-6 w-full h-full max-h-96 max-w-96 flex flex-col items-center dark:bg-gray-700 dark:text-white">
        {/* Profile Picture */}
        {/* <p className="pb-3 text-red-500 dark:text-yellow-400 font-semibold">
          ⚠️Audio calling function not available!
        </p> */}
        <img
          className="w-20 h-20 rounded-full"
          src={user.profileUrl || profile}
          alt="Profile"
        />
        {/* User Name */}
        <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
        {/* Call Message */}
        <p className="text-gray-500 mb-6 dark:text-gray-400">
          {/* Start Audio Call */}
        </p>

        {/* Call Control Buttons */}
        {!isCallCreated && (
          <div className="flex flex-col-reverse h-full">
            <div className="flex flex-row space-x-12">
              <button
                className="bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none px-6 py-2 text-lg"
                onClick={onClose}
              >
                Cancel
              </button>
              <button className="bg-blue-500 text-white rounded-lg hover:bg-green-600 focus:outline-none px-6 py-2 text-lg" 
              onClick={callUser(user.userId)}
              >
                Call
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col-reverse h-full">
          {/* Cancel Call */}
          <div className="flex flex-row space-x-12">
            {/* <button
              className="bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
              onClick={onClose}
            >
              <i className="fas fa-times text-xl px-5"></i>
            </button> */}

            {/* Accept Call */}
            {!callAccepted ? (
              <button
                className="bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none"
                onClick={onClose}
              >
                <i className="fas fa-phone p-5"></i>
              </button>
            ) : (
              <button className="bg-blue-500 text-white rounded-full hover:bg-green-600 focus:outline-none">
                <i className="fas fa-phone p-5"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioCallModal;

// import React, { useRef, useState, useEffect } from "react";
// import profile from "../../assets/profile.png";
// import { socket } from "../../socket/socket"; // Ensure this is correctly configured

// const AudioCallModal = ({
//   user,
//   isAudioCallModalVisible,
//   setIsAudioCallModalVisible,
// }) => {

 
    
//   const [stream, setStream] = useState(null); // Local audio stream
//   const [callAccepted, setCallAccepted] = useState(false);
//   const [callEnded, setCallEnded] = useState(false);
//   const [receivingCall, setReceivingCall] = useState(false);
//   const [caller, setCaller] = useState("");
//   const [callerSignal, setCallerSignal] = useState(null);

//   const userAudio = useRef(); // For the user's own audio
//   const connectionRef = useRef(); // WebRTC connection reference

//   const userId = localStorage.getItem("currentUser")?.userId;

  

  

//   useEffect(() => {
//     // Get local audio stream
//     navigator.mediaDevices
//       .getUserMedia({ audio: true })
//       .then((currentStream) => {
//         setStream(currentStream);
//         if (userAudio.current) {
//           userAudio.current.srcObject = currentStream; // Play back the local stream
//         }
//       });

//     // Listen for incoming calls
//     socket.on("incomingCall", (data) => {
//       console.log("INcoming call");
//       setReceivingCall(true);
//       setCaller(data.from);
//       setCallerSignal(data.signal);
//       setIsAudioCallModalVisible(true);
//     });

//     return () => {
//       socket.off("incomingCall");
//     };
//   }, []);
//    if (!isAudioCallModalVisible) return null;

//   const callUser = (id) => {
//      const peer = new RTCPeerConnection({
//        iceServers: [
//          {
//            urls: "stun:stun.l.google.com:19302", // STUN server
//          },
//        ],
//      });

//      // Get the audio stream from the user's media device
//      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
//        // Add each audio track to the peer connection
//        stream.getTracks().forEach((track) => peer.addTrack(track, stream));

//        // Create an offer (signaling data)
//        peer
//          .createOffer()
//          .then((offer) => {
//            return peer.setLocalDescription(offer);
//          })
//          .then(() => {
//            socket.emit("callUser", {
//              userToCall: id,
//              signalData: peer.localDescription,
//              from: localStorage.getItem("currentUser").userId,
//            });
//          });

//        // When receiving ICE candidates, send them to the remote peer
//        peer.onicecandidate = (event) => {
//          if (event.candidate) {
//            socket.emit("iceCandidate", {
//              candidate: event.candidate,
//              receiverId: id,
//            });
//          }
//        };
//      });

//      // When remote stream is received
//      peer.ontrack = (event) => {
//        const remoteStream = new MediaStream();
//        remoteStream.addTrack(event.track);

//        // Attach the remote audio stream to an audio element to play the sound
//        const audioElement = document.createElement("audio");
//        audioElement.srcObject = remoteStream;
//        audioElement.play();
//      };

//      socket.on("callAccepted", (signal) => {
//        peer.setRemoteDescription(new RTCSessionDescription(signal));
//      });
//   };

//   const answerCall = () => {
//     setCallAccepted(true);
//     const peer = new RTCPeerConnection();

//     peer.addStream(stream); // Add local stream to the peer connection

//     peer.ontrack = (event) => {
//       userAudio.current.srcObject = event.streams[0]; // Set remote stream to the audio element
//     };

//     peer.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("answerCall", {
//           signal: peer.localDescription,
//           to: caller,
//         });
//       }
//     };

//     peer.setRemoteDescription(new RTCSessionDescription(callerSignal));

//     peer.createAnswer().then((answer) => {
//       peer.setLocalDescription(answer).then(() => {
//         socket.emit("answerCall", {
//           signal: answer,
//           to: caller,
//         });
//       });
//     });

//     connectionRef.current = peer;
//   };

//   const leaveCall = () => {
//     setCallEnded(true);
//     // connectionRef.current.close(); // Close the peer connection
//     setIsAudioCallModalVisible(false);
//   };

//   const onClose = () => {
//     setIsAudioCallModalVisible(false);
//   };

  

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-fuchsia-100 rounded-lg p-6 w-full h-full max-h-96 max-w-96 flex flex-col items-center dark:bg-gray-700 dark:text-white">
//         <p className="pb-3 text-red-500 dark:text-yellow-400 font-semibold">
//           {callAccepted ? "In Call" : "Audio Call is Ready"}
//         </p>
//         <img
//           className="w-20 h-20 rounded-full"
//           src={user.profileUrl || profile}
//           alt="Profile"
//         />
//         <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
//         <p className="text-gray-500 mb-6 dark:text-gray-400">
//           {callAccepted ? "You are in an audio call" : "Start Audio Call"}
//         </p>
//         <audio playsInline ref={userAudio} autoPlay /> {/* For audio stream */}
//         <div className="flex flex-col-reverse h-full">
//           <div className="flex flex-row space-x-12">
//             <button
//               className="bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
//               onClick={leaveCall}
//             >
//               <i className="fas fa-times text-xl p-5"></i>
//             </button>
//             {!callAccepted && !receivingCall ? (
//               <button
//                 className="bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none"
//                 onClick={() => callUser(user.userId)} // Replace with the correct user ID
//               >
//                 <i className="fas fa-phone p-5"></i>
//               </button>
//             ) : null}
//             {receivingCall && !callAccepted ? (
//               <button
//                 className="bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
//                 onClick={answerCall}
//               >
//                 <i className="fas fa-phone p-5"></i>
//               </button>
//             ) : null}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AudioCallModal;

