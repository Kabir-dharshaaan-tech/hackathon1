

const express = require("express");
const UserForm = require("../models/UserForm");
const authMiddleware = require("../middleware/auth"); 

const router = express.Router();


router.post("/", authMiddleware, async (req, res) => {
  const { name, phone, description, github, linkedin, education } = req.body;

  try {
    let userForm = await UserForm.findOne({ user: req.user.id });

    if (userForm) {
      
      userForm.name = name;
      userForm.phone = phone;
      userForm.description = description;
      userForm.github = github;
      userForm.linkedin = linkedin;
      userForm.education = education;
    } else {
     
      userForm = new UserForm({
        user: req.user.id, 
        name,
        phone,
        description,
        github,
        linkedin,
        education,
      });
    }

    await userForm.save();
    res.status(201).json({ message: "User data saved successfully!", user: userForm });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, could not save data" });
  }
});


router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await UserForm.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, could not fetch data" });
  }
});


router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userForm = await UserForm.findOne({ user: req.user.id });

    if (!userForm) {
      return res.status(404).json({ message: "User form not found" });
    }

    res.json(userForm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
