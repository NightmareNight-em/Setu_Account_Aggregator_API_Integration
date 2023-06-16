const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app); // advantagious in future if want to implement any other communication protocols

server.listen(PORT, console.log("Server is up and running at port " + PORT));
