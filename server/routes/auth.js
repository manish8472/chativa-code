const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Profile = require("../models/Profile");


const router = express.Router();

// Register a new user
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(403).json({ msg: "User already exists" });

    user = new User({ username, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const userProfile = new Profile({email: email, userId: user._id, name:username });
    await userProfile.save();

    const payload = { userId: user.id };
    console.log(user.id);
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ userProfile, token });
  } catch (err) {
    return res.status(500).json(err, "Server error");
  }
});

// Login user
router.post("/signin",  async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });
    
    const userProfile = await Profile.findOne({ userId: user.id });
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // const usernfo = { username: user.username, email: user.email };
    console.log(userProfile);

    res.status(200).json({ userProfile, token });
  } catch (err) {
    res.status(500).json({err: "Server error"});
  }
});

module.exports = router;
