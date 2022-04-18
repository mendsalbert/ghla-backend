const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FavoriteSchema = mongoose.Schema({
  product: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Favorite", FavoriteSchema);
