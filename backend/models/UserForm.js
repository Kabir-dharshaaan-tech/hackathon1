


const mongoose = require("mongoose");

const UserFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String },
  github: { type: String },
  linkedin: { type: String },
  education: { 
    type: String,
    enum: ["High School", "Undergraduate", "Postgraduate", ""], // Allow empty value
    default: "Undergraduate" // Provide a default value if necessary
  }
});

module.exports = mongoose.model("UserForm", UserFormSchema);
