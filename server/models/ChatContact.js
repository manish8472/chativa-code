const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  contacts: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      conversationId: {
        type: String,
        ref: "Message",
        required: true,
        // unique: true,
      },
      email: { type: String , default: "......@gmail.com"},
      name: { type: String },
      profileUrl: { type: String, default: "" },
      lastMessage: {
        // For quick retrieval of the latest message in a chat
        message: { type: String }, // The content of the last message
        timestamp: { type: Number, default: Date.now }, // When the last message was sent
      },
      unreadMessages: { type: Number, default: 0 },
    },
  ],
});

module.exports = mongoose.model("ChatContact", chatSchema);
