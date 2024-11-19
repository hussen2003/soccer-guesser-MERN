//game unlimited players version page api

import User from "../models/userModel.js";

import Player from "../models/playerModel.js";

export const collectlux = async (req, res) => {
    try {
        const { lux } = req.body;
        //const users = await User.find({}).select({ "name": 1, "score": 1, "_id": 0}).sort({ score: -1 }).limit(10);

        //res.status(201).json(users);
        //res.status(201).json(lux);
        const userName = "Bot"; // Define the username to search for

        if (lux !== -1) {
          const userRecord = await User.findOne({ username : userName });
          if (userRecord) {
            userRecord.lux = parseInt(lux); // Set lux value
            await userRecord.save(); // Save updated record
            res.status(201).json({ lux: userRecord.lux }); // Return updated lux
          } else {
            res.status(404).json({ error: "User not found" });
          }
        } else {
          const userRecord = await User.findOne({ username: userName });
          if (userRecord) {
            res.status(201).json({ user: userRecord });
          } else {
            res.status(404).json({ error: "User not found" });
          }
        }
        

    } catch (error) {
      console.log("Error in unlimited controller", error.message);
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
      console.log("Error in unlimited controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
};