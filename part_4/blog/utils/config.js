require("dotenv").config();

let PORT = process.env.PORT;
let MONGO_URI = process.env.MONGO_URI;

if (process.env.NODE_ENV === "test") {
  MONGO_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
  PORT,
  MONGO_URI,
};
