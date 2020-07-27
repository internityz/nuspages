const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  footer: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
});

const Card = mongoose.model("Card", cardSchema);
module.exports = Card;
