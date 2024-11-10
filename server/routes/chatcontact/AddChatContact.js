const express = require("express");
const ChatContact = require("../../models/ChatContact");
const Profile = require("../../models/Profile");
const router = express.Router();

router.post("/add/chatcontact", async (req, res) => {
    const { userId, contactId} = req.body;
    try {
     // find user which want to add in chat contact list
      const user = await Profile.findOne({ userId: contactId });
      // Add participats to Chat Contact
      let chatContact = await ChatContact.findOne({ userId: userId });

      let chatContactAlreadyExists = await ChatContact.findOne({
        userId: userId,
        contacts: { $elemMatch: { userId: user.id } },
      });

      if (!chatContactAlreadyExists) {
        if (chatContact) {
          chatContact.contacts.push({
            userId: user.userId,
            name: user.name,
            lastMessage: {
              message: message,
            },
            profileUrl: user?.profilePic,
          });
        } else {
          chatContact = new ChatContact({
            userId: userId,
            contacts: [
              {
                userId: user.id,
                name: user.name,
                lastMessage: {
                  message: message,
                },
                profileUrl: user?.profilePic,
              },
            ],
          });
        }

        await chatContact.save();
      }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
});

module.exports = router