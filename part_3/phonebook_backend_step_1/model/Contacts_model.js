const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const ContactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
  },
});

ContactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
ContactSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Contact", ContactSchema);
