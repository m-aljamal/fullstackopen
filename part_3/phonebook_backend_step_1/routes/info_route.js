const express = require("express");
const router = express.Router();
const Contect = require("../model/Contacts_model");

router.get("/", async (req, res) => {
  const date = new Date();
  const contacts = await Contect.find({});
  console.log(contacts);

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(
    `<p>Phonebook has info for ${contacts.length} people</p><br /><p>${date}</p>`
  );
  res.end();
});

module.exports = router;
