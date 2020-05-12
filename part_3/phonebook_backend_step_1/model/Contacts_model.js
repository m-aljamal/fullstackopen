const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  name: String,
  number: String,
});


ContactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model("Contact", ContactSchema);
