require("dotenv").config();
const serverPort = process.env.SERVER_PORT || 5001;
const mongoDBAtlasUrl =
  process.env.MONGODB_ATLAS_URL ||
  `mongodb://localhost:27017/shotMomentsDB2023`;
const defaultUserImgPath =
  process.env.DEFAULT_USER_IMAGE_PATH ||
  "../public/images/users/userDefault.png";

module.exports = {
  serverPort,
  mongoDBAtlasUrl,
  defaultUserImgPath,
};