const express = require("express");

const User = require("../../models/User");
const ChatContact = require("../../models/ChatContact");

const Message = require("../../models/Message");
const Profile = require("../../models/Profile");

const router = express.Router();

// Send invitation message
router.post("/message", async (req, res) => {
  const { userId, email, message, name } = req.body;
  console.log(userId, email, message, name);

  try {
    // Find the receiver's user by email
    const receiver = await User.findOne({ email: email });
    if (!receiver) return res.status(400).json({ msg: "User not found" });

    // Find the sender's details
    const sender = await User.findById(userId);

    /*
     * Step 1: Add message to Message Schema
     * Because we need chat ID for updating the contact list,
     * we first ensure the message conversation exists or is created.
     */
    let conversationExists = await Message.findOne({
      participants: { $all: [userId, receiver._id] }, // Use $all to match both participants regardless of order
    });

    let conversationId;

    if (conversationExists) {
      // If the conversation exists, push the new message
      conversationId = conversationExists._id;

      conversationExists.messages.push({
        senderId: userId,
        message: message,
        type: "text",
      });
      await conversationExists.save();
    } else {
      // Create a new conversation if none exists
      const newConversation = new Message({
        participants: [userId, receiver._id],
        messages: [
          {
            senderId: userId,
            message: message,
            type: "text",
          },
        ],
      });
      await newConversation.save();
      conversationId = newConversation._id;
    }

    /*
     * Step 2: Add/update sender's ChatContact
     */
     const senderProfile = await Profile.findOne({ userId: userId });
     const receiverProfile = await Profile.findOne({ userId: receiver._id });
    let senderChatContactExist = await ChatContact.findOne({
      userId: userId,
      "contacts.conversationId": conversationId,
    });

    if (senderChatContactExist) {
      // Update existing contact's last message
      await ChatContact.updateOne(
        {
          userId: userId,
          "contacts.conversationId": conversationId,
        },
        {
          $set: {
            "contacts.$.lastMessage.message": message,
            "contacts.$.lastMessage.timestamp": Date.now(),
          },
        }
      );
    } else {
      let senderChatContact = await ChatContact.findOne({ userId: userId });
      if (senderChatContact) {
        // If sender has a contact list, add the new contact
        senderChatContact.contacts.push({
          userId: receiver._id,
          conversationId: conversationId,
          name: name,
          lastMessage: { message: message },
          email: email,
          profileUrl: receiverProfile.profilePic,
        });
      } else {
        // Create a new contact list for the sender if none exists
        senderChatContact = new ChatContact({
          userId: userId,
          contacts: [
            {
              userId: receiver._id,
              conversationId: conversationId,
              name: name,
              lastMessage: { message: message },
              email: email,
              profileUrl: receiverProfile.profilePic,
            },
          ],
        });
      }
      await senderChatContact.save();
    }

    /*
     * Step 3: Add/update receiver's ChatContact
     */
    
    let receiverChatContactExist = await ChatContact.findOne({
      userId: receiver._id,
      "contacts.conversationId": conversationId,
    });

    if (receiverChatContactExist) {
      // Update existing contact's last message for receiver
      await ChatContact.updateOne(
        {
          userId: receiver._id,
          "contacts.conversationId": conversationId,
        },
        {
          $set: {
            "contacts.$.lastMessage.message": message,
            "contacts.$.lastMessage.timestamp": Date.now(),
          },
        }
      );
    } else {
      let receiverChatContact = await ChatContact.findOne({
        userId: receiver._id,
      });
      if (receiverChatContact) {
        // If receiver has a contact list, add the new contact
        receiverChatContact.contacts.push({
          userId: userId,
          conversationId: conversationId,
          name: sender.name || sender.email,
          lastMessage: { message: message },
          email: sender.email,
          profileUrl: senderProfile.profilePic,
        });
      } else {
        // Create a new contact list for the receiver if none exists
        receiverChatContact = new ChatContact({
          userId: receiver._id,
          contacts: [
            {
              userId: userId,
              conversationId: conversationId,
              name: sender.name || sender.email,
              lastMessage: { message: message },
              email: sender.email,
              profileUrl: senderProfile.profilePic,
            },
          ],
        });
      }
      await receiverChatContact.save();
    }

    const msg = await Message.findOne({_id: conversationId});
    const leg = msg.messages.length-1;
    console.log(msg.messages[leg], conversationId);

    // Successfully added message and updated contact lists
    res
      .status(200)
      .json({ message :msg.messages[leg], conversationId: conversationId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});


module.exports = router;
