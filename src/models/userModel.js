const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { defaultUserImgPath } = require("../secret");

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      maxLength: [
        50,
        "User name is too long! The length of user name can be maximum 50 characters",
      ],
      minLength: [
        3,
        "User name is too short! The length of user name can be minimum 3 characters",
      ],
    },
    email: {
      type: String,
      required: [true, "User email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
        },
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      required: [true, "User password is required"],
      minLength: [
        6,
        "Password is too short! The length of password can be minimum 6 characters",
      ],
      set: (value) => bcrypt.hashSync(value, bcrypt.genSaltSync(10)),
    },
    image: {
      type: String,
      default: defaultUserImgPath,
    },
    phone: {
      type: String,
      required: [true, "User phone number is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "User address is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const User = model("Users", usersSchema);

module.exports = User;
