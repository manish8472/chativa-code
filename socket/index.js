// import { Server } from "socket.io";

// let users = [];

// const addUsers = (newUser, socketId) => {
//   // Check if the user is already in the users array, if not, add them
//   !users.some((user) => user.userId === newUser.userId) &&
//     users.push({ ...newUser, socketId });
// };

// // Remove user from the array when they log out or disconnect
// const removeUser = (socketId) => {
//   users = users.filter((user) => user.socketId !== socketId);
// };

// // find receiver socketid
// const getReceiverSocketId = (receiverId) => {
//   const receiver = users.find((user) => user.userId === receiverId);
//   return receiver?.socketId;
// }

// const io = new Server(3000, {
//   cors: {
//     origin: "http://localhost:5173", // Frontend URL
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
//   transports: ["websocket", "polling"], // Enable both transports
// });

// const getUser = (userId) => {
//   return users.find((user) => user.userId === userId);
// };

// // Listening for a socket connection
// io.on("connection", (socket) => {
//   console.log("socket connected");

//   // Listening for an 'addUser' event from the client
//   socket.on("addUser", (newUser) => {
//     addUsers(newUser, socket.id);
//     io.emit("getUsers", users); // Broadcast the list of connected users
//   });

//   // Listening for a 'sendMessage' event and emitting 'getMessage'
//   socket.on("sendMessage", (data) => {
//     const receiverSocketId = getReceiverSocketId(data.receiverId);
//     io.to(receiverSocketId).emit("getMessage", data); // Broadcast the message to receiver clients
//   });

//    socket.on("callUser", (data) => {
//      io.to(data.userToCall).emit("incomingCall", {
//        signal: data.signalData,
//        from: data.from,
//      });
//    });

//    socket.on("answerCall", (data) => {
//      io.to(data.to).emit("callAccepted", data.signal);
//    });

//   // Handling 'disconnect' event when the user closes tab or disconnects
//   socket.on("disconnect", () => {
//     removeUser(socket.id); // Remove user on disconnect
//     io.emit("getUsers", users); // Broadcast updated user list
//     console.log("User disconnected:", socket.id);
//   });
// });


import { Server } from "socket.io";

let users = [];

const addUsers = (newUser, socketId) => {
  // Check if the user is already in the users array, if not, add them
  !users.some((user) => user.userId === newUser.userId) &&
    users.push({ ...newUser, socketId });
};

// Remove user from the array when they log out or disconnect
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// find receiver socketid
const getReceiverSocketId = (receiverId) => {
  const receiver = users.find((user) => user.userId === receiverId);
  return receiver?.socketId;
};

const io = new Server(3000, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"], // Enable both transports
});

// Get the user object by userId
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

// Listening for a socket connection
io.on("connection", (socket) => {
  console.log("socket connected");

  // Listening for an 'addUser' event from the client
  socket.on("addUser", (newUser) => {
    addUsers(newUser, socket.id);
    io.emit("getUsers", users); // Broadcast the list of connected users
  });

  // Listening for a 'sendMessage' event and emitting 'getMessage'
  socket.on("sendMessage", (data) => {
    const receiverSocketId = getReceiverSocketId(data.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("getMessage", data); // Broadcast the message to receiver clients
    }
  });

  // WebRTC call signaling: Initiating a call
  socket.on("callUser", (data) => {
    console.log(data);
    const receiverSocketId = getReceiverSocketId(data.userToCall);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("incomingCall", {
        signal: data.signalData,
        from: data.from,
      });
    }
  });

//   // WebRTC call signaling: Answering a call
//   socket.on("answerCall", (data) => {
//     const callerSocketId = getReceiverSocketId(data.to);
//     if (callerSocketId) {
//       io.to(callerSocketId).emit("callAccepted", data.signal);
//     }
//   });

//   // WebRTC call signaling: Handle ICE candidate exchange
//   socket.on("iceCandidate", (data) => {
//     const receiverSocketId = getReceiverSocketId(data.receiverId);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("iceCandidate", data.candidate);
//     }
//   });

  // Handling 'disconnect' event when the user closes the tab or disconnects
  socket.on("disconnect", () => {
    removeUser(socket.id); // Remove user on disconnect
    io.emit("getUsers", users); // Broadcast updated user list
    console.log("User disconnected:", socket.id);
  });
});
