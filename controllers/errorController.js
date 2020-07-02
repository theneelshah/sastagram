const AppError = require("../utils/appError");

const handleCastError = (error) => {
  return new AppError(`Invalid ${error.path}: ${error.value}`, 400);
};

const handleDuplicateNameError = (error) => {
  const { keyValue } = error;
  const { name } = keyValue;
  return new AppError(
    `Duplicate value found for name: ${name}. Please use a unique value`,
    400
  );
};

const handleValidationError = (error) => {
  const { errors } = error;
  const err = Object.values(errors).map((el) => el.message);
  return new AppError(`Validation error(s) found: ${err.join(", ")}`, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please login again", 401);

const handleJWTExpiterError = () =>
  new AppError("Token has been expired, please login again", 401);

const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log(err);
    res.status(500).json({
      status: "failed miserably",
      message:
        "something went really wrong from our side, please tell us about the problem when this error was faced.",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  // const { statusCode } = err;

  if (process.env.NODE_ENV === "development") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;
    if (error.name === "CastError") error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicateNameError(error);
    if (error.name === "ValidationError") error = handleValidationError(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiterError();

    sendProdError(error, res);
  }
};
