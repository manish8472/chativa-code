const express = require("express");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const url = process.env.MONGO_URI;

const storage = new GridFsStorage({ 
   url: url,
   options: { useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpg", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
     
      return `${file.originalname}_${Date.now()}`;
    }
    return {
      bucketName: "fs",
      filename: `${file.originalname}_${Date.now()}`,
      metadata: {
        originalname: file.originalname,
      },
    };
     
  },
});

storage.on("connection", (db) => {
  console.log("GridFS connected successfully");
});

storage.on("error", (err) => {
  console.error("Error in GridFS Storage:", err);
});

const upload = multer({ storage });
module.exports = { upload };
