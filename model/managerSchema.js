const mongoose = require("mongoose");

const ManagerSchema = mongoose.Schema({
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

let manager = mongoose.model("Manager",ManagerSchema)
module.exports = manager