const app = require("express")();
const server = require("http").createServer(app);
const port = 3000;
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Connected");
  socket.on("chat", (payload) => {
    io.emit("chat", payload);
  });
});

server.listen(port, () => {
  console.log(`Server runnning at port ${port}`);
});

app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});
