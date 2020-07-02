const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = require("./app");

dotenv.config();

const MongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 4546;
const HOST = process.env.HOST || "127.0.0.1";

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});

mongoose.connection.on("error", (err) => {
  console.log(`Error in connection: ${err}`);
});

const server = app.listen(PORT, HOST, () => {
  console.log(`Server running on:- http://${HOST}:${PORT}`);
});

process.on("unhandledRejection", (error) => {
  server.close(() => {
    console.log("Cannot connect to database");
    console.log(error);
  });
});
