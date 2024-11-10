const express = require("express");
const ChatContact = require("../../models/ChatContact");
const router = express.Router();

// delete chat contact
router.delete("/delete", async (req, res) => {
    const { userId, conversationId } = req.body;

    try {
      // Find the ChatContact document for the user and remove the contact with the matching conversationId
      const result = await ChatContact.findOneAndUpdate(
        { userId: userId }, // Find the ChatContact for the user
        { $pull: { contacts: { conversationId: conversationId } } }, // Remove contact with conversationId
        { new: true } // Return the updated document
      );

      if (!result) {
        return res
          .status(404)
          .json({
            message: "Contact not found or user does not have this contact",
          });
      }

      res
        .status(200)
        .json({
          message: "Contact successfully removed",
          updatedContactList: result,
        });
    } catch (error) {
      res.status(500).json({ message: "Error deleting contact", error });
    }
})

module.exports = router 