const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
  },
  secondname: {
    type: String,
  },
  image: { type: Buffer, type: String },
  firstguardian: {
    type: String,
  },
  firstguardiancontact: {
    type: String,
  },
  secondguardian: {
    type: String,
  },
  secondguardiancontact: {
    type: String,
  },
  nameofschool: {
    type: String,
  },
  classname: {
    type: String,
  },
  gpsaddress: {
    type: String,
  },
  housenumber: {
    type: String,
  },
  contact: {
    type: String,
  },
  email: {
    type: String,
  },
  ghanacard: {
    type: String,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

module.exports = mongoose.model("User", UserSchema);
