const express = require("express");
const ChatContact = require("../../models/ChatContact");
const router = express.Router();

// increase unread count
router.put("/increaseunreadcount", async (req, res) => {
  const { userId, conversationId, message } = req.body;
  console.log(userId, conversationId);
  try {
    // Find the ChatContact document for the user and update the unread count
    const result = await ChatContact.findOneAndUpdate(
      { userId: userId, "contacts.conversationId": conversationId },
      {
        $inc: { "contacts.$.unreadMessages": 1 },
        $set: {
          "contacts.$.lastMessage": { message: message, timestamp: Date.now() }, // Update the entire lastMessage object
        },
      }
    );

    if (!result) {
      return res.status(404).json({
        message: "Contact not found or user does not have this contact",
      });
    }

    res.status(200).json(result.contacts);
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact", error });
  }
});

// mark zero unread Message
router.put("/decreaseunreadcount", async (req, res) => {
  const { userId, conversationId } = req.body;
  console.log(userId, conversationId);
  try {
    // Find the ChatContact document for the user and update the unread count
    const result = await ChatContact.findOneAndUpdate(
      { userId: userId, "contacts.conversationId": conversationId },
      {
       $set : {"contacts.$.unreadMessages": 0}
      }
    );

    if (!result) {
      return res.status(404).json({
        message: "Contact not found or user does not have this contact",
      });
    }

    console.log(result);
    res.status(200).json({msg: "successfully set unreadMessage count 0"});
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact", error });
  }
});

module.exports = router;
