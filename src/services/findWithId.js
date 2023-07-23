const createError = require("http-errors");
const User = require("../models/userModel");
const { default: mongoose } = require("mongoose");

const findWithId = async (id, option = {}) => {
  try {
    const item = await User.findById(id, option);
    if (!item) throw createError(404, "Item doesn't exist!");
    return item;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(400, "Invalid item id!");
    }
    throw error;
  }
};

module.exports = {
  findWithId,
};
