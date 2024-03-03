//landing page api

import User from "../models/userModel.js";

const leaderboardAmount = 10;

export const leaderboard = async (req, res) => {
    try {
      //const { score } = req.body;
        const users = await User.find({}).select({ "username": 1, "score": 1, "_id": 0}).sort({ score: 1 }).limit(20);
  
      

    //   if (!user) {
    //     return res.status(400).json({ error: "Username does not exist" });
    //   }
  
    //   if (password != user.password) {
    //     return res.status(400).json({ error: "Incorrect password" });
    //   }
  
    //   res.status(201).json({
    //     _id: user._id,
    //     name: user.name,
    //     email: user.email,
    //     username: user.username,
    //     score: user.score,
    //   });

        res.status(201).json(users);

    } catch (error) {
      console.log("Error in login controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };