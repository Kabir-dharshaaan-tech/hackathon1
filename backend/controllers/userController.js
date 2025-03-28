const UserInfo = require("../models/UserInfo");


const createUserInfo = async (req, res) => {
  try {
    const { name, phone, description, github, linkedin, education } = req.body;

    const newUserInfo = new UserInfo({ name, phone, description, github, linkedin, education });
    await newUserInfo.save();

    res.status(201).json({ message: "User info saved successfully!", data: newUserInfo });
  } catch (error) {
    res.status(500).json({ message: "Error saving user info", error: error.message });
  }
};


const getUserInfo = async (req, res) => {
  try {
    const users = await UserInfo.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user info", error: error.message });
  }
};

module.exports = { createUserInfo, getUserInfo };
