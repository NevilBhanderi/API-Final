const mongoose = require("mongoose");

const EmploySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

let employ = mongoose.model("Employ",EmploySchema)
module.exports = employ