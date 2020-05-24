const logger = require("./logger");
const jwt = require("jsonwebtoken");
const config = require("./config");

const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method);
  logger.info("path:", req.path);
  logger.info("Body:", req.body);
  logger.info("------");
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "noDataFound") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "NoDataWithId") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "UserIsAlredyExists") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "vallidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "userNotFound") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "wrongPassword") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "notAuthorized") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) res.status(401).json({ error: "token missing or invalid" });
  try {
    const decoded = jwt.verify(token, config.JWT_KEY);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "invaild token" });
  }
};

module.exports = {
  auth,
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
