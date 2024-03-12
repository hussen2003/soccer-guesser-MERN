//game daily version page api

import User from "../models/userModel.js";

const leaderboardAmount = 10;

export const leaderboard = async (req, res) => {
    try {
      //const { score } = req.body;
        const users = await User.find({}).select({ "name": 1, "score": 1, "_id": 0}).sort({ score: -1 }).limit(20);

        res.status(201).json(users);

    } catch (error) {
      console.log("Error in daily controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateScore = async (req, res) => {
    try {
        const { username, dailyScore } = req.body;

        await User.updateOne({ username }, { dailyScore: dailyScore });

        res.status(201).json({
            username: username,
            dailScore: dailyScore || 0
          });

    } catch (error) {
      console.log("Error in daily controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateGuess = async (req, res) => {
    try {
        const { username, guess, tryAmount } = req.body;

        const user = await User.findOne({ username });

        if(tryAmount == 1){
          user.currentGuesses.fill("");
        }

        user.currentGuesses[tryAmount - 1] = guess;

        res.status(201).json({
          
          });

    } catch (error) {
      console.log("Error in daily controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
};

export const endGame = async (req, res) => {
  try {
      
      const date = new Date();
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      const { username, score, tryAmount } = req.body;

      const user = await User.findOne({ username });
      user.dailyScore = score;
      user.score += score;
      user.amountGamesPlayed++;
      
      const lastDatePlayed = new Date(user.lastDatePlayed);
      if((date - lastDatePlayed) == 86000000){
        user.streak++;
      }else{
        user.streak = 0;
      }

      if(tryAmount < 7){
        user.guessDistribution[tryAmount - 1]++;
        user.amountGamesWon++;
      }else{
        user.streak = 0;
      }

      const winRate = 100 * (parseFloat(user.amountGamesWon)/user.amountGamesPlayed);

      user.lastDatePlayed = date;
      await user.save();

      res.status(201).json({
          streak: user.streak || 0,
          winRate: winRate,
          score: user.dailyScore,
          allTimeScore: user.score,
          guessDistribution: user.guessDistribution
        });

  } catch (error) {
    console.log("Error in daily controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};