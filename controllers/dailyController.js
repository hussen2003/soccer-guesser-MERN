//game daily version page api

import User from "../models/userModel.js";

const leaderboardAmount = 10;

export const leaderboard = async (req, res) => {
    try {
      //const { score } = req.body;
        const users = await User.find({}).select({ "name": 1, "dailyScore": 1, "_id": 0}).sort({ dailyScore: -1 }).limit(20);

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
            dailyScore: dailyScore || 0
          });

    } catch (error) {
      console.log("Error in daily controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateGuess = async (req, res) => {
    try {
        const date = new Date();
        date.setHours(date.getHours() - 5);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
      
        const { username, guess, tryAmount } = req.body;

        const user = await User.findOne({ username });
        
        if(tryAmount == 0){
          user.currentGuesses.fill("");
          user.usedHint.fill(false);
        } else {
          user.currentGuesses[tryAmount - 1] = guess;
        }

        user.lastDatePlayed = date;
        await user.save();
        res.status(201).json({ 
          guesses: user.currentGuesses
         });

    } catch (error) {
      console.log("Error in daily controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getGuesses = async (req, res) => {
  try {
      const { username } = req.body;
      const user = await User.findOne({ username });

      const date = new Date();
      date.setHours(date.getHours() - 5);
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      const finishedDate = new Date(user.lastDateFinished);
      const lastDate = new Date(user.lastDatePlayed);

      var finishedToday, playedToday;
      
      if((lastDate - finishedDate) > 0){
        playedToday = true;
        finishedToday = false;
      }else if((finishedDate - date) == 0){
        playedToday = true;
        finishedToday = true;
      }else{
        playedToday = false;
        finishedToday = false;
      }

      res.status(201).json({
        playedToday, 
        finishedToday,
        guesses: user.currentGuesses,
        hints: user.usedHint,
        dailyScore: user.dailyScore || 0,
      });

  } catch (error) {
    console.log("Error in daily controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }  
}

export const endGame = async (req, res) => {
  try {
      
      const date = new Date();
      date.setHours(date.getHours() - 5);
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      const { username, score, tryAmount } = req.body;

      const user = await User.findOne({ username });

      if(user.amountGamesPlayed != 0){
        const lastDateFinished = new Date(user.lastDateFinished);

        if((date - lastDateFinished) > 0){
          user.dailyScore = score;
          user.score += score;
          user.amountGamesPlayed++;
        
          if(tryAmount < 7){
            user.guessDistribution[tryAmount - 1]++;
            user.amountGamesWon++;

            if((date - lastDateFinished) == 86400000){
              user.streak++;
            }else{
              user.streak = 1;
            }

          }else{
            user.streak = 0;
          }
        
        }
      }else{
        user.dailyScore = score;
        user.score += score;
        user.amountGamesPlayed++;

        if(tryAmount < 7){
          user.guessDistribution[tryAmount - 1]++;
          user.amountGamesWon++;
          user.streak = 1;
        }else{
          user.streak = 0;
        }
      }

      const winRate = 100 * (parseFloat(user.amountGamesWon)/user.amountGamesPlayed);

      user.lastDateFinished = date;
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

export const updateHints = async (req, res) => {
  try {
    const { username , dex } = req.body;

    const user = await User.findOne({ username });
    user.usedHint[dex] = true;
    await user.save();
    res.status(201).json({
        hints: user.usedHint
      });

  } catch (error) {
  console.log("Error in daily controller", error.message);
  res.status(500).json({ error: "Internal Server Error" });
  }
};