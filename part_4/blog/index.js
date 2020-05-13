const http = require('http')
const app = require('./app')
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const server = http.createServer(app)
mongoose
  .connect(
    `mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASS}@cluster0-fbyyl.mongodb.net/blog_app?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    server.listen(port, () => {
      logger.info(`server running at port ${port}`);
    });
  })
  .catch((err) => {
    logger.error(err);
  });

const port = process.env.PORT || 3001;
