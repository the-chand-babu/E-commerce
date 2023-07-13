const mongoose = require("mongoose");

require("dotenv").config();
const connection = mongoose.connect(
  "mongodb+srv://chandnwj:chandbabu@cluster0.jsk2z6k.mongodb.net/E-commerce?retryWrites=true&w=majority"
);

module.exports = { connection };
