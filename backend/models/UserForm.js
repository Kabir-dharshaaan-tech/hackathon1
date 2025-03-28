


const mongoose = require("mongoose");

const UserFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String },
  github: { type: String },
  linkedin: { type: String },
  education: { 
    type: String,
    enum: ["High School", "Undergraduate", "Postgraduate", ""], 
    default: "Undergraduate" 
  }
});

module.exports = mongoose.model("UserForm", UserFormSchema);
