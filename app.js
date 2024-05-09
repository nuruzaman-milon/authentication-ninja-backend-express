const express = require("express");
const userRouter = require("./routes/userRoute");
const checkLogin = require("./middleware/checkLogin");
require("dotenv").config();
const cors = require("cors");

const app = express();

//middleware
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

//base route
app.use("/api/v1/user", userRouter);

module.exports = app;
