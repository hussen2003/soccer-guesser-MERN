//models for databse collections/tables

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  username: {
    type: "string",
    required: true,
    unique: true,
  },
  password: {
    type: "string",
    required: true,
    minLength: 6,
  },
  score: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
