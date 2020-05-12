const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
app.use(express.json());
app.use(cors());
app.use(express.static("build"));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
morgan.token(":method", function (req, res) {
  return req.headers["content-type"];
});

app.use("/api/persons", require("./routes/contacts_routes"));

app.use("/info", require("./routes/info_route"));

app.use((req, res) => {
  res.status(404).send({ error: "unknown endpoit" });
});
app.use((error, req, res, next) => {
  console.log(error.message);
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else {
    res.status(400).json({ error: "server error" });
  }
  next(error);
});
mongoose
  .connect(
    `mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASS}@cluster0-fbyyl.mongodb.net/phonebook?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )

  .then(() => {
    app.listen(port, () => {
      console.log("app start at " + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
mongoose.set("useFindAndModify", false);
const port = process.env.PORT || 3001;
