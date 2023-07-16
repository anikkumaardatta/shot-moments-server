const createError = require("http-errors");
const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const { default: mongoose } = require("mongoose");

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
        { address: { $regex: searchRegExp } },
      ],
    };
    const option = { password: 0, __v: 0 };

    const users = await User.find(filter, option)
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await User.find(filter).countDocuments();

    if (!users) throw next(createError(404, "Users not found!"));

    return successResponse(res, {
      statusCode: 200,
      message: "Users returned successfully.",
      payload: {
        totalUser: count,
        users,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const option = { password: 0, __v: 0 };

    const user = await User.findById(id, option);
    if (!user) throw next(createError(404, "User doesn't exist!"));
    return successResponse(res, {
      statusCode: 200,
      message: "User were returned successfully.",
      payload: {
        user,
      },
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "Invalid User id!"));
      return
    }
    next(error)
  }
};
module.exports = {
  getUsers,
  getUserById,
};
