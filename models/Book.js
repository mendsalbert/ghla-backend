const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookSchema = mongoose.Schema({
  image: { type: Buffer, type: String },
  title: {
    type: String,
  },
  number: {
    type: String,
  },
  copynumber: {
    type: String,
  },
  author: {
    type: String,
  },
  assertion: {
    type: String,
  },
  type: {
    type: String,
  },
  ownedby: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Book", BookSchema);
