const server = require("express")();
const http = require("http").createServer(server);
const io = require("socket.io")(http);
let players = [];

io.on("connection", function (socket) {
  console.log("A user connected: " + socket.id);
  //upon connection, add the id to the players array
  players.push(socket.id);
  if (players.length === 1) {
    io.emit("isPlayerA");
  }
  socket.on("dealCards", function () {
    //emit sends messages to the clients when socket.io receives a "dealCards message"
    io.emit("dealCards");
  });

  socket.on("cardPlayed", function (gameObject, isPlayerA) {
    io.emit("cardPlayed", gameObject, isPlayerA);
  });

  socket.on("disconnect", function () {
    console.log("A user disconnected: " + socket.id);
    //upon disconnection, remove the player from the players array
    players = players.filter((player) => player !== socket.id);
  });
});

http.listen(3000, function () {
  console.log("Server started");
});
