const mongoose = require("mongoose");
const { mongoDBAtlasUrl } = require("../secret");

const connectDB = async (options = {}) => {
  try {
    // connection logics
    await mongoose.connect(mongoDBAtlasUrl, options);
    console.log(`Successfully connect to DB - ${mongoDBAtlasUrl}`);
    mongoose.connection.on("error", (error) => {
      console.error(`DB connection error - ${error}`);
    });
  } catch (error) {
    console.error(`Could't connect to DB - ${error.toString()}`);
  }
};

module.exports = connectDB;
