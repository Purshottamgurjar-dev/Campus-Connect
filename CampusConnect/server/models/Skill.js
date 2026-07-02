const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  initials: {
    type: String,
    required: true,
  },
  avatarClass: {
    type: String,
    default: "blue-avatar",
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const skillSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  avatar: {
    type: String,
    default: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
  },
  tutorAvatar: {
    type: String,
    default: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300",
  },
  name: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    required: true,
  },
  categoryClass: {
    type: String,
    default: "coding",
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    default: "Flexible Schedule",
  },
  rating: {
    type: Number,
    default: 5.0,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  tutorBio: {
    type: String,
    default: "",
  },
  tutorTeaches: {
    type: [String],
    default: [],
  },
  reviewsList: {
    type: [reviewSchema],
    default: [],
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("Skill", skillSchema);
