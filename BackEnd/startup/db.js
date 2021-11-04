const mongoose = require("mongoose");
const config = require("config");

const mongoURI = process.env.mongoURI || config.get("mongoURI");

if (!mongoURI) {
  console.log("FATAL ERROR: No database URI detected.");
  process.exit(0);
}

async function connectDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log("[CONNECTED TO DATABASE]");
  } catch (err) {
    console.log("AN ERROR OCCURED: ", err);
  }
}

module.exports = connectDB;
