const mongoose = require("mongoose");

const pitchSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    problem: { type: String, required: true },
    solution: { type: String, required: true },
    techStack: { type: String },
    impact: { type: String, required: true },
    attachment: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pitch", pitchSchema);