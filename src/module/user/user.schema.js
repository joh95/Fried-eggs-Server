const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, enum: ["m", "f"] },
  country: { type: String, required: true },
  birthDate: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique:true },
  cc: { type: String, required: true, unique: true },
  role: { type: Number, required: true, enum: [1, 0], default:0 }, //1 para Admin y 0 para user
  balance: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model("User", userSchema);
