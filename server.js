const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = require("./app");

dotenv.config();

const MongoURI = process.env.MONGO_URI;
const { PORT, HOST } = process.env;

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});

mongoose.connection.on("error", (err) => {
  console.log(`Error in connection: ${err}`);
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on:- http://${HOST}:${PORT}`);
});
