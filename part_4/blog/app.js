const express = require("express");
const config = require("./utils/config");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
require('express-async-errors') // used to eliminate try-catch
mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info(`connecting to database`);
  })
  .catch((err) => {
    logger.error(err);
  });
app.use(cors());
app.use(express.static("build")); // use the frontend build files
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", require("./routes/blogs_routes"));

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
