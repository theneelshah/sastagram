const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const server = app.listen(PORT, HOST, () => {
  console.log(`Server running on:- http://${HOST}:${PORT}`);
});

process.on("unhandledRejection", (error) => {
  server.close(() => {
    console.log("Cannot connect to database");
    console.log(error);
  });
});
