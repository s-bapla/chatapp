const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const fetch = require("node-fetch");

const app = express();

app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join", (room) => {
    socket.join(room);
    console.log("user joined", socket.id, room);
  });

  socket.on("send-message", (data) => {
      socket.to(data.room).emit("receive-message", data);
    });

  socket.on("customDisconnect", () => {
    console.log("Custom disconnect requested", socket.id);
    socket.disconnect();
  });

  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
  });
});

app.get("/fetch-gif", async (req, res) => {
  try {
    // Fetch the GIF from the external source as binary data
    const response = await fetch(
      "https://cs361app-11a914b658ec.herokuapp.com/gif"
    );
    const buffer = await response.buffer(); // Get the response as a buffer
    console.log(buffer)
    // Set the correct content type and send the buffer
    res.setHeader("Content-Type", "image/gif");
    res.send(buffer);
  } catch (error) {
    console.error("Error fetching GIF:", error);
    res.status(500).send("Error fetching GIF");
  }
});

httpServer.listen(4000, () => console.log("server listneing on port 4000"));
