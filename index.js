const express = require("express");
const dbConnect = require("./dbConnect");
require("dotenv").config();
const app = require("./app"); //get app from app.js page

const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Homepage is running perfectly");
});

app.listen(port, async () => {
  console.log(`Example app listening on port http://localhost:${port}`);
  await dbConnect();
});
