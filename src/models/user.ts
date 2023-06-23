import mongoose, { Document } from "mongoose";
const isValid = require("validator");

interface User extends Document {
  name: string;
  title: string;
  email: string;
  age: number;
}

const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  age: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<User>("User", userSchema);
