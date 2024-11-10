const express = require("express");
const Message = require("../../models/Message");
const ChatContact = require("../../models/ChatContact");
const User = require("../../models/User");
const ContactList = require("../../models/ContactList");
const Profile = require("../../models/Profile");
const router = express.Router();


// For Finding Message of a conversation
router.get('/get/messages/:conversationId', async (req, res) => {
  const { conversationId } = req.params;
  console.log(conversationId);

  try {
    const conversation = await Message.findOne({
      _id: conversationId,
    });
    

    if (!conversation) {
      return res
        .status(400)
        .json({ msg: "User does not have any conversation" });
    }





    return res.status(200).json(conversation.messages);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err, msg: "Server Error" });
  }
});

// When send a message , then add to convesation

router.post("/add/message", async (req, res) => {
  const { senderId, type, message, conversationId, receiverId, fileUrl } = req.body;
  console.log(senderId, type, message, conversationId, receiverId);

  try {
    // Find the conversation by ID
    let conversation = await Message.findOne({ _id: conversationId });

    if (conversation) {
      // Add message to existing conversation
      conversation.messages.push({
        senderId: senderId,
        message: message,
        type: type,
        fileUrl: fileUrl || ""
      });
      await conversation.save();
    } else {
      // If no conversation found, create a new one
      conversation = new Message({
        _id: conversationId, // Always use _id for Mongoose
        messages: [
          {
            senderId: senderId,
            message: message,
            type: type,
            fileUrl: fileUrl || "",
          },
        ],
      });
      await conversation.save();
    }

    // Update the last message in all participants' ChatContacts
    const updateResult = await ChatContact.updateMany(
      { "contacts.conversationId": conversationId }, // Find all chat contacts with this conversation
      {
        $set: {
          "contacts.$[elem].lastMessage": {
            message: message, // Update last message content
            timestamp: new Date().getTime(), // Update the timestamp
          },
        },
      },
      {
        arrayFilters: [{ "elem.conversationId": conversationId }], // Apply update to matching array elements
        multi: true, // Ensure multiple documents are updated
      }
    );

    // Handle adding receiver to their contact list if not already added
    const sender = await User.findById(senderId);

    // Check if the receiver already has this conversation in their chat contacts
    let receiverChatContact = await ChatContact.findOne({
      userId: receiverId,
      "contacts.conversationId": conversationId,
    });

    // Fetch the sender's name from ContactList (if exists)
    const contactList = await ContactList.findOne(
      { userId: receiverId, "contacts.contactId": senderId },
      { "contacts.$": 1 }
    );
    let name = contactList?.contacts[0]?.name || sender.email;

    const receiverProfile = await Profile.findOne({ userId: receiverId });

    if (!receiverChatContact) {
      // If receiver does not have the conversation in their ChatContact, add it
      receiverChatContact = await ChatContact.findOne({ userId: receiverId });

      if (receiverChatContact) {
        receiverChatContact.contacts.push({
          userId: senderId,
          conversationId: conversationId,
          name: name,
          lastMessage: { message: message },
          email: sender.email,
          profileUrl: receiverProfile.profilePic,
        });
      } else {
        // If receiver doesn't have a ChatContact list, create one
        receiverChatContact = new ChatContact({
          userId: receiverId,
          contacts: [
            {
              userId: senderId,
              conversationId: conversationId,
              name: name,
              lastMessage: { message: message },
              email: sender.email,
              profileUrl: receiverProfile.profilePic,
            },
          ],
        });
      }
      await receiverChatContact.save();
    }

    // Return the conversation messages
    return res.status(200).json(conversation.messages);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err, msg: "Server Error" });
  }
});


// A message delete from conversation
router.delete("/deleteMessage/:conversationId/:messageId", async (req, res) => {
  const { conversationId, messageId } = req.params; // Extract the IDs from the request parameters

  console.log(conversationId, messageId);

  try {
    // Find the document by _id and pull the message with the specified message _id
    const result = await Message.updateOne(
      { _id: conversationId }, // Find the message document by its _id
      { $pull: { messages: { _id: messageId } } }
    );
    
    console.log(result);
    
    /**
     * This is for the update the lastMessage of ChatContact list of current coversation
     */
    const restmessage = await Message.findOne({ _id: conversationId });
    const size = restmessage.messages.length-1;
    // update lastMessage in chatContact with last message in Message array
    const updateResult = await ChatContact.updateMany(
      { "contacts.conversationId": conversationId }, // Find all documents with this conversationId in the contacts array
      {
        $set: {
          "contacts.$[elem].lastMessage": {
            // Use array filters to target the correct element
            message: size >= 0 ? restmessage.messages[size].message : "", // Update the last message content
            timestamp: size >= 0 ? restmessage.messages[size].timestamp : "", // Update the timestamp (use current time if not provided)
          },
        },
      },
      {
        arrayFilters: [{ "elem.conversationId": conversationId }], // Specify that the element must match the conversationId
        multi: true, // Update multiple documents
      }
    );
    
    if (result.modifiedCount > 0) {
      return res.status(200).json({msg: "Message deleted successfully"});
    } else {
      return res.status(404).json({ error: "Message or document not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
