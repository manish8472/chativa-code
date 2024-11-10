const mongoose = require("mongoose");

const chatMessages = new mongoose.Schema({
  participants:[
    {type: mongoose.Schema.Types.ObjectId, ref:"User"}
  ],
  messages: [
    {
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required:true,}, // Who sent the message
      message: { type: String }, // Content of the message
      timestamp: { type: Date, default: Date.now }, // When the message was sent
      seen: { type: Boolean, default: false }, // Message read status
      type: { type: String , default: "text"},
      fileUrl: {type: String, default: ""},
    },
  ],
});

module.exports = mongoose.model("Message", chatMessages);
