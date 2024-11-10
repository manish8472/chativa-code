
// import mongoose from "mongoose";

const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;

const connectDB = async () => {
  
  try {
    
    await mongoose.connect(process.env.MONGO_URI, {
      
    });
    console.log("You successfully connected to MongoDB!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

// export default connectDB;

