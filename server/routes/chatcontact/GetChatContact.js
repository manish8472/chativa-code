const express = require("express");
const ChatContact = require("../../models/ChatContact");
const router = express.Router();


router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
//   console.log(userId);
  try {
    const chatContact = await ChatContact.findOne({ userId: userId });
    if (!chatContact) {
      return res.status(404).json({ msg: "No contacts found for this user" });
    }
    res.status(200).json(chatContact.contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router