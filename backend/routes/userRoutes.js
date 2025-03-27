const express = require("express");
const UserForm = require("../models/UserForm");

const router = express.Router();

// @route   POST /api/users
// @desc    Store user form data
// @access  Public
router.post("/", async (req, res) => {
  const { name, phone, description, github, linkedin, education } = req.body;

  try {
    const newUser = new UserForm({ name, phone, description, github, linkedin, education });
    await newUser.save();
    res.status(201).json({ message: "User data saved successfully!", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, could not save data" });
  }
});

// @route   GET /api/users
// @desc    Get all user form submissions
// @access  Public
router.get("/", async (req, res) => {
  try {
    const users = await UserForm.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, could not fetch data" });
  }
});

module.exports = router;
