const Skill = require("../models/Skill");

// @route   GET /api/skills
// @desc    Get all skills with optional search or category filters
const getSkills = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== "All") {
      // Perform case-insensitive match for category
      query.category = { $regex: new RegExp("^" + category + "$", "i") };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } }
      ];
    }

    const skills = await Skill.find(query).sort({ createdAt: -1 });
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/skills/:id
// @desc    Get single skill listing details
const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: "Skill listing not found" });
    }
    res.status(200).json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   POST /api/skills
// @desc    Create a new skill listing
const createSkill = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      availability,
      tutorBio,
      tutorTeaches
    } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: "Please provide title, description, and category" });
    }

    // Determine categoryClass
    let categoryClass = "coding";
    const cat = category.toLowerCase().replace(" ", "");
    if (cat.includes("coding")) categoryClass = "coding";
    else if (cat.includes("design")) categoryClass = "design";
    else if (cat.includes("math")) categoryClass = "math";
    else if (cat.includes("lang")) categoryClass = "languages";
    else if (cat.includes("music")) categoryClass = "music";
    else if (cat.includes("prep")) categoryClass = "examprep";

    const newSkill = new Skill({
      userId: req.user._id,
      name: req.user.name,
      school: req.user.college || "My Campus",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
      tutorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300",
      category,
      categoryClass,
      title,
      description,
      availability: availability || "Flexible Schedule",
      tutorBio: tutorBio || req.user.bio || "No biography provided.",
      tutorTeaches: tutorTeaches || [category],
      rating: 5.0,
      reviews: 0,
      reviewsList: []
    });

    const savedSkill = await newSkill.save();
    res.status(201).json(savedSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   POST /api/skills/:id/reviews
// @desc    Add review for a skill listing
const addSkillReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    if (!rating || !comment) {
      return res.status(400).json({ message: "Please provide rating and comment" });
    }

    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: "Skill listing not found" });
    }

    // Helper to get initials
    const nameParts = req.user.name.split(" ");
    const initials = nameParts.map(p => p[0]).join("").toUpperCase().slice(0, 2);

    const newReview = {
      initials,
      avatarClass: ["blue-avatar", "purple-avatar", "green-avatar", "red-avatar"][Math.floor(Math.random() * 4)],
      name: req.user.name,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      rating: Number(rating),
      comment
    };

    skill.reviewsList.push(newReview);
    skill.reviews = skill.reviewsList.length;

    // Recalculate average rating
    const sum = skill.reviewsList.reduce((acc, curr) => acc + curr.rating, 0);
    skill.rating = Number((sum / skill.reviewsList.length).toFixed(1));

    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSkills, getSkillById, createSkill, addSkillReview };
