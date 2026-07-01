const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    default: "",
  },

  college: {
    type: String,
    default: "",
  },

  bio: {
    type: String,
    default: "",
  },

  skillsToTeach: {
    type: [String],
    default: [],
  },

  skillsToLearn: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);