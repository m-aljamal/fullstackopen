require("dotenv").config();

let PORT = process.env.PORT;
let MONGO_URI = process.env.MONGO_URI;
let JWT_KEY = process.env.JWT_KEY
if (process.env.NODE_ENV === "test") {
  MONGO_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
  PORT,
  MONGO_URI,
  JWT_KEY
};
