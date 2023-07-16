const express = require("express");
const app = express();
const morgan = require("morgan");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routers/userRouter");
const seedRouter = require("./routers/seedRouter");
const { errorHandler } = require("./controllers/responseController");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message:
    "Too many requests from this IP. Please wait a few minutes and try again later.",
});

app.use(apiLimiter);
app.use(xssClean());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use( "/api/users",userRouter)
app.use( "/api/seed",seedRouter)



app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to SHOT MOMENTS API",
  });
});

app.get("/testing", (req, res) => {
  res.status(200).send({
    message: "SHOT MOMENTS Server running successfully.",
  });
});




app.get("/api/users", (req, res) => {
  res.status(200).send({
    message: "User info returned successfully.",
  });
});

// Client Error Handling==========!!!!!!!
app.use((req, res, next) => {
  next(createError(404, "Route Not found!"));
});
// Server Error Handling==========!!!!!!! -> all the errors handle from here.
app.use((err, req, res, next) => {
  return errorHandler(res, {
    statusCode: err.status,
    message: err.message
  })
});

module.exports = app;
