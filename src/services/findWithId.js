const createError = require("http-errors");
const User = require("../models/userModel");
const { default: mongoose } = require("mongoose");

const findWithId = async (Model, id, option = {}) => {
  try {
    const item = await Model.findById(id, option);
    if (!item) throw createError(404, `${Model.modelName} doesn't exist!`);
    return item;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(400, `Invalid ${Model.modelName} id!`);
    }
    throw error;
  }
};

module.exports = {
  findWithId,
};