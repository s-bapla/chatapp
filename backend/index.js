const express = require("express");
const cors = require("cors");
const {createServer} = require("http");
const { Server } = require("socket.io");


const app = express();

app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('join', (room)=> {
        socket.join(room);
        console.log("user joined", socket.id, room);
    });

    socket.on('send-message', (data) => {
        socket.to(data.room).emit('receive-message', data)
    });

    socket.on("disconnect", () => {
        console.log("disconnected", socket.id)
    });
});

httpServer.listen(4000, () => console.log("server listneing on port 4000"));
