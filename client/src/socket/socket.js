import { io } from "socket.io-client";

export const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"], // Enable WebSocket and polling transport
  withCredentials: true, // Allow credentials if needed
});
