const mongoose = require("mongoose");

const ContactList = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  contacts: [
    {
      contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      email: {
        type: String,
      },
      name: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("ContactList", ContactList);
