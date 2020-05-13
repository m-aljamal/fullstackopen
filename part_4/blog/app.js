const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");

app.use(cors());
app.use(express.static("build")); // use the frontend build files
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", require("./routes/blogs_routes"));

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
