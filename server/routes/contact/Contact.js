const express = require("express");
const router = express.Router();
const ContactList = require("../../models/ContactList");
const User = require("../../models/User");
const ChatContact = require("../../models/ChatContact");

const Message = require("../../models/Message");

// This router is used to get all contacts
router.post("/get", async (req, res) => {
  const { userId } = req.body; // Extract userId from the request body

  try {
    const contactList = await ContactList.findOne({ userId: userId });

    if (!contactList) {
      return res.status(404).json({ msg: "No contacts found for this user" });
    }

    res.status(200).json(contactList.contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// This router is used to add a new contact
router.post("/add", async (req, res) => {
  const { userId, name, email} = req.body;

  try {
    // Find the receiver's user so that they can be added as a contact by email
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    // Check if the contact already exists in the sender's contact list
    let contactExists = await ContactList.findOne({
      userId: userId,
      contacts: {
        $elemMatch: { contactId: user._id },
      },
    });

    // If the contact is already in the list, return an error message
    if (!contactExists) {
      //   return res.status(400).json({ msg: "Contact already added" });

      // If the contact list of sender is exists, add the new contact to the existing contact list
      let senderContactList = await ContactList.findOne({
        userId: userId,
      });

      if (senderContactList) {
        // Add the new contact to the existing contact list
        senderContactList.contacts.push({
          contactId: user._id,
          email: email,
          name: name,
        });
      } else {
        // Create a new contact list if the user doesn't have one yet
        senderContactList = new ContactList({
          userId: userId,
          contacts: [
            {
              contactId: user._id,
              email: email,
              name: name,
            },
          ],
        });
      }

      // Save the updated or newly created contact list
      await senderContactList.save();
    }

    /**
     * If ChatContact list of current added user is exist then update the name
     */

    const updatedContact = await ChatContact.findOneAndUpdate(
      {
        userId: userId, // Match by userId of the main chat owner
        "contacts.userId": user._id, // Match by userId in contacts array
      },
      {
        $set: {
          "contacts.$.name": name, // Update the name
        },
      },
      { new: true } // Return the updated document
    );

    res.status(200).json({ msg: "Contact added successfully"});
  } catch (err) {
    console.error(err);
    // Properly use res.status().send() to send error response
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Delete Contact
// Route to delete a contact
router.delete("/delete/:userId/:contactId", async (req, res) => {
  const { userId, contactId } = req.params;
  console.log(userId, contactId);

  try {
    // Delete from contact list of sender
    const result = await ContactList.findOneAndUpdate(
      { userId: userId },
      { $pull: { contacts: { contactId: contactId } } },
      { new: true }
    );

    // Delete from contact list of receiver
    const result2 = await ContactList.findOneAndUpdate(
      { userId: contactId },
      { $pull: { contacts: { contactId: userId } } },
      { new: true }
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
});

module.exports = router;
