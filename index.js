const express = require("express");
const app = express();
const axios = require("axios");
const { log } = require("console");

app.get("/", (req, res) => {
  res.json();
});

app.listen(3000, () => {
  console.log("servor has started");
});
