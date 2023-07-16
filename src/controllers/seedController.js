const { data } = require("../data");
const User = require("../models/userModel");

const seedUsers = async (req, res, next) => {
  try {
    // deleting all existing users
    await User.deleteMany({});

    // Inserting new users
    const users = await User.insertMany(data.users);

    //successful response
    return res.status(201).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = { seedUsers };
