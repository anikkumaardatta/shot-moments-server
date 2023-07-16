const express = require("express");
const { getUsers, getUserById } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);

module.exports = userRouter;
