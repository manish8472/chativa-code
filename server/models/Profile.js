// User Profile Schema
const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true }, // Reference to Auth schema
  email: { type: String },
  name: { type: String },
  profilePic: { type: String, default: "" }, // URL to profile picture
  status: { type: String, default: "offline" }, // User's status (e.g., online, offline)
  lastSeen: { type: String , default: Date.now() },
  bio: {type: String, default: "Available"},
  location: { type: String , default: "Unknown"},
});

module.exports = mongoose.model("Profile", profileSchema);
