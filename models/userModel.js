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
  emailVerified: {
    type: Boolean,
    default: false,
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
    default: 0,
  },
  guessDistribution: {
    type: [Number],
    default: [0, 0, 0, 0, 0, 0],
  },
  amountGamesPlayed: {
    type: Number,
    default: 0,
  },
  amountGamesWon: {
    type: Number,
    default: 0,
  },
  streak: {
    type: Number,
    default: 0,
  },
  currentGuesses: {
    type: [String],
    default: ["", "", "", "", "", ""],
  },
  usedHint: {
    type: [Boolean],
    default: [false, false, false, false, false],
  },
});

const User = mongoose.model("users", userSchema);

export default User;
