const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");
const globalErrorHandler = require("./controllers/errorController");

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.body);
  next();
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);

app.use(globalErrorHandler);

module.exports = app;
