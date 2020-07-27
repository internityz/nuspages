const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  content: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    required: true,
  },
  theme: {
    type: Boolean,
    required: true,
  },
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
