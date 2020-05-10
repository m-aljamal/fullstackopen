const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
app.use(express.json());
app.use(cors());
let contacts = [
  {
    name: "Muhammed ",
    number: "040-125456",
    id: 1,
  },
  {
    name: "Ali ",
    number: "040-125456",
    id: 2,
  },
  {
    name: "Nour ",
    number: "040-125456",
    id: 3,
  },
  {
    name: "Rami ",
    number: "040-125456",
    id: 4,
  },
  {
    name: "Enas ",
    number: "040-125456",
    id: 5,
  },
];
app.use(express.static('build'))

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
morgan.token(":method", function (req, res) {
  return req.headers["content-type"];
});

app.get("/api/persons", (req, res) => {
  res.json(contacts);
});

app.get("/info", (req, res) => {
  const date = new Date();

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(
    `<p>Phonebook has info for ${contacts.length} people</p><br /><p>${date}</p>`
  );
});
app.get("/api/person/:id", (req, res) => {
  const contact = contacts.filter((cont) => cont.id === Number(req.params.id));
  if (contact.length === 0) {
    res.status(404).json({ message: "can not find the person with that id" });
  }
  res.json(contact);
});
app.delete("/api/persons/:id", (req, res) => {
  contacts = contacts.filter((cont) => cont.id !== Number(req.params.id));

  res.json({ msg: "contact deleted" });
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name) {
    res.status(401).json({ error: "missing name, please provide name value " });
  }
  if (!number) {
    res
      .status(401)
      .json({ error: "missing number, please provide number value " });
  }

  const findName = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );

  if (findName) {
    res.status(401).json({ error: "name must be unique" });
  }
  const newObject = {
    name,
    number,
    id: Math.round(Math.random() * 100),
  };
  contacts.push(newObject);
  res.json(newObject);
});
const PORT  =  process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("app start at " + PORT);
});
