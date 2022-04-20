const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
  },
  username: {
    type: String,
  },
  lastname: {
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
  usertype: {
    type: String,
  },
  date: {
    type: String,
  },
  age: {
    type: String,
  },
  rname: {
    type: String,
  },
  rschool: {
    type: String,
  },
  rbox: {
    type: String,
  },
  rlocation: {
    type: String,
  },
  recommendmessage: {
    type: String,
  },
  rsign: {
    type: Boolean,
  },

  gsign: { type: Boolean },

  interest: {
    type: String,
  },
  gfullname: {
    type: String,
  },
  gaddress: {
    type: String,
  },
  gphone: {
    type: String,
  },
  gdate: {
    type: Date,
  },
  gofficeaddress: {
    type: String,
  },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

module.exports = mongoose.model("User", UserSchema);
