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
    const { name } = req.query;
    const { data } = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?name=${name ? name : ""}&apiKey=${api}`,
    );
    console.log("data", data);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ test: "fonctionne pas :(" });
    }
  } catch (error) {
    console.log(error, "error");
  }
});

app.get("/card/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${id}?apiKey=${api}`,
    );
    console.log(data);

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ test: "fonctionne pas :(" });
    }
  } catch (error) {
    console.log(error, "error");
  }
});

app.get("/comics", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${api}&limit=100&skip=15000`,
    );

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ test: "fonctionne pas :(" });
    }
  } catch (error) {
    console.log(error, "error");
  }
});

app.get("/comics/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${id}?apiKey=${api}`,
    );

    if (data) {
      res.status(200).json(data);
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
