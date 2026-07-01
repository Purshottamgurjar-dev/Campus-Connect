const User = require("../models/User");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    res.status(200).json({
      message: "Data received successfully",
      data: {
        name,
        email,
        password,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { signup };