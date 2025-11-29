import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },   // hashed stored password
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
      required: true,
    },
    department: { type: String, default: null },
    year: { type: Number, default: null },
  },
  { timestamps: true }
);

// NO pre-save hashing → because seeding already hashes password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
