const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true, unique: true },
    whatsappNumber: { type: String },
    password: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    gender: { type: String, enum: ["male", "female", "other"] },
    role: { type: String, required: true, enum: ["user", "admin"] },
    bio: { type: String, default: "" },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", UserSchema);
 
