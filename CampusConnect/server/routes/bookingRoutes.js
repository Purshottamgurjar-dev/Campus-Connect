const express = require("express");
const router = express.Router();
const { createBooking, getMyBookings, updateBookingStatus } = require("../controllers/bookingController");
const auth = require("../middleware/auth");

router.post("/", auth, createBooking);
router.get("/my-sessions", auth, getMyBookings);
router.put("/:id/status", auth, updateBookingStatus);

module.exports = router;
