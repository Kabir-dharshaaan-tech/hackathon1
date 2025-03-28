


const Pitch = require("../models/pitch");


exports.createPitch = async (req, res) => {
  try {
    const { title, category, problem, solution, techStack, impact } = req.body;
    const attachment = req.file ? req.file.path : null;

    const newPitch = new Pitch({
      title,
      category,
      problem,
      solution,
      techStack,
      impact,
      attachment,
    });

    await newPitch.save();
    res.status(201).json({ message: "Pitch submitted successfully", newPitch });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};


exports.getPitches = async (req, res) => {
  try {
    const pitches = await Pitch.find();
    res.status(200).json(pitches);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
