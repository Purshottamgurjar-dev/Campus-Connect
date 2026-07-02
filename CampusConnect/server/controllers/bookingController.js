const Booking = require("../models/Booking");
const Skill = require("../models/Skill");

// @route   POST /api/bookings
// @desc    Create a new booking request
const createBooking = async (req, res) => {
  try {
    const { skillId, date, time, message } = req.body;

    if (!skillId || !date || !time) {
      return res.status(400).json({ message: "Please enter all required fields" });
    }

    const skill = await Skill.findById(skillId);
    if (!skill) {
      return res.status(404).json({ message: "Skill listing not found" });
    }

    // Check if user is booking their own skill
    if (skill.userId.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot book your own skill listing" });
    }

    const booking = new Booking({
      skillId,
      tutorId: skill.userId,
      studentId: req.user._id,
      subject: skill.title,
      date,
      time,
      message: message || "",
      status: "Pending"
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/bookings/my-sessions
// @desc    Get all booking requests involving the current user
const getMyBookings = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch bookings where user is either student or tutor
    const bookings = await Booking.find({
      $or: [{ studentId: userId }, { tutorId: userId }]
    })
      .populate("studentId", "name email college bio")
      .populate("tutorId", "name email college bio")
      .populate("skillId", "title category categoryClass availability avatar tutorAvatar")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   PUT /api/bookings/:id/status
// @desc    Update a booking status (Accept/Decline/Cancel)
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const userId = req.user._id;

    if (!["Confirmed", "Cancelled", "Completed", "Pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Authorization checks:
    // If cancelling, either student or tutor can do it.
    // If confirming or completing, only the tutor can do it.
    const isTutor = booking.tutorId.toString() === userId.toString();
    const isStudent = booking.studentId.toString() === userId.toString();

    if (!isTutor && !isStudent) {
      return res.status(403).json({ message: "Not authorized to modify this booking" });
    }

    if (status === "Confirmed" && !isTutor) {
      return res.status(403).json({ message: "Only tutors can confirm booking requests" });
    }

    if (status === "Completed" && !isTutor) {
      return res.status(403).json({ message: "Only tutors can mark bookings as completed" });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBooking, getMyBookings, updateBookingStatus };
