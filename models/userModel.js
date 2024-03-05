//models for user databse collections/tables

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  score: {
    type: Number,
  },
  dailyDate:{
    type: String,
  }
});

const User = mongoose.model("users", userSchema);

export default User;
