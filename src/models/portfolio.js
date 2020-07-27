const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
  md: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);
module.exports = Portfolio;
