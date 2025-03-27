



const express = require("express");
const UserForm = require("../models/UserForm");

const router = express.Router();

// ✅ Create a new user entry
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

// ✅ Get all users
router.get("/", async (req, res) => {
  try {
    const users = await UserForm.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, could not fetch data" });
  }
});

// ✅ Get a single user by ID (Fix for `404 Not Found`)
router.get("/me", async (req, res) => {
  try {
    const user = await UserForm.findOne(); // Fetch the first available user (for demo purposes)

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
