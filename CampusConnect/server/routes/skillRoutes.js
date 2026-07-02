const express = require("express");
const router = express.Router();
const { getSkills, getSkillById, createSkill, addSkillReview } = require("../controllers/skillController");
const auth = require("../middleware/auth");

router.get("/", getSkills);
router.get("/:id", getSkillById);
router.post("/", auth, createSkill);
router.post("/:id/reviews", auth, addSkillReview);

module.exports = router;
