const express = require("express")
const Profile = require("../../models/Profile")

const router = express.Router();

// Update name and location
router.put("/update", async (req, res) => {
  const { userId, name, location, bio } = req.body;
  console.log(userId, name, location, bio);

  try {
    // Find profile by userId and update
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: userId },
      { $set: { name: name, location: location, bio:bio } },
      { new: true } // Return the updated document
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", updatedProfile });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// update profile photo
router.put("/update/photo", async(req, res) =>{
    const { profileUrl, userId } = req.body;
    
    try {
      // Find profile by userId and update
      const updatedProfile = await Profile.findOneAndUpdate(
        { userId: userId },
        { $set: { profilePic : profileUrl} },
        { new: true } // Return the updated document
      );

      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      res
        .status(200)
        .json({ message: "Profile updated successfully", updatedProfile });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
    
})

// get Profile using userId
router.post("/get", async (req, res) => {
  const { userId } = req.body;
  try {
    const profile = await Profile.findOne({ userId: userId });
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
