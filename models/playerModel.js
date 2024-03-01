//models for player database collections/tables

import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  players: [
    {
      name: {
        type: String,
      },
      nationality: {
        type: String,
      },
      league: {
        type: String,
      },
      club: {
        type: String,
      },
      positions: {
        type: String,
      },
      age: {
        type: Number,
      },
      image: {
        type: String,
      },
      country_flag: {
        type: String,
      },
      club_logo: {
        type: String,
      },
      overall: {
        type: Number,
      },
    },
  ],
});

const Player = mongoose.model("players", playerSchema);

export default Player;
