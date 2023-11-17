const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(cors());

app.get("/fetch-gif", async (req, res) => {
  try {
    const response = await fetch(
      "https://cs361app-11a914b658ec.herokuapp.com/gif"
    );
    const buffer = await response.buffer();
    res.send(buffer.toString("base64"));
  } catch (error) {
    console.error("Error fetching GIF:", error);
    res.status(500).send("Error fetching GIF");
  }
});

app.listen(3001, () => {
  console.log("Proxy server running on port 3001");
});
