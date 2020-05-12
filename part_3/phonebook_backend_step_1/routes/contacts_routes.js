const express = require("express");
const router = express.Router();
const Contact = require("../model/Contacts_model");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    console.log(contacts);

    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ message: "can not find the person with that id" });
    } else {
      res.json(contact);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { name, number } = req.body;
  if (!name) {
    res.status(401).json({ error: "missing name, please provide name value " });
  }
  if (!number) {
    res
      .status(401)
      .json({ error: "missing number, please provide number value " });
  }
  try {
    const findName = await Contact.findOne({ name });

    if (findName) {
      res.status(401).json({ error: "name must be unique" });
    }

    const newObject = new Contact({
      name,
      number,
    });
    newObject.save();
    res.json(newObject);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const { name, number } = req.body;
  try {
    const contact = {
      name,
      number,
    };
    const updateContact = await Contact.findByIdAndUpdate(
      req.params.id,
      contact,
      { new: true }
    );
    res.json(updateContact);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
