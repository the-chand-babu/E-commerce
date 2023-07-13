const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});

const AdminModel = mongoose.model("Admin", AdminSchema);

module.exports = { AdminModel };
