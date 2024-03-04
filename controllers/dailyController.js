//game daily version page api

import User from "../models/userModel.js";

import Player from "../models/playerModel.js";

const leaderboardAmount = 10;

export const leaderboard = async (req, res) => {
    try {
      //const { score } = req.body;
        const users = await User.find({}).select({ "username": 1, "score": 1, "_id": 0}).sort({ score: -1 }).limit(20);

        res.status(201).json(users);

    } catch (error) {
      console.log("Error in daily controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateScore = async (req, res) => {
    try {
        const { username, score } = req.body;

        await User.updateOne({ username }, { score: score })

        res.status(201).json({
            username: username,
            score: score || 0
          });

    } catch (error) {
      console.log("Error in daily controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
};