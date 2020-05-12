const express = require("express");
const router = express.Router();
const Contact = require("../model/Contacts_model");
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contact.find({});

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

router.post(
  "/",
  [
    check("name", "name is required").notEmpty(),
    check("name", "name should contain at least 3 charcters").isLength({
      min: 3,
    }),

    check("number", "number is required").notEmpty(),
    check("number", "number should contain at least 8 charcters").isLength({
      min: 8,
    }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    const { name, number } = req.body;
   
    try {
      const findName = await Contact.findOne({ name });

      if (findName) {
        return res.status(401).json({ error: "name must be unique" });
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
  }
);

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
