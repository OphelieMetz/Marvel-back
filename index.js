require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const api = process.env.API_KEY;

app.get("/", async (req, res) => {
  try {
    res.status(200).json({ test: "working" });
  } catch (error) {
    console.log(error, "error");
  }
});

app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${api}`,
    );
    const newTest = req.query.response;

    if (response) {
      res.status(200).json({ test: newTest });
    } else {
      res.status(400).json({ test: "fonctionne pas :(" });
    }
  } catch (error) {
    console.log(error, "error");
  }
});

app.all(/.*/, (req, res) => {
  res.status(404).send("Page introuvable");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log("servor has started");
});
