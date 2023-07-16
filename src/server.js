const app = require("./app");
const connectDB = require("./configuration/db.config");
const { serverPort } = require("./secret");


app.listen(serverPort, async() => {
  console.log(`Server running on http://localhost:${serverPort}`);
  await connectDB()
});
