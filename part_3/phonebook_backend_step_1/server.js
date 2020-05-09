const express = require("express");
const app = express();

app.use(express.json());

const contacts = [
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
];

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
const port = 3001;

app.listen(port, () => {
  console.log("app start at " + port);
});
