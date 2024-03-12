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
    default: 0,
  },
  dailyScore: {
    type: Number,
    default: 0,
  },
  dailyDate: {
    type: String,
    default: "",
  },
  lastDatePlayed: {
    type: String,
    default: "",
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
});

const User = mongoose.model("users", userSchema);

export default User;
