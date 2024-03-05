//players api

import Player from "../models/playerModel.js";

export const getRandomPlayer = async (req, res) => {
    try {
      
      const players = await Player.find({});
      var randomNum = Math.round( Math.random() * players.length );
      
      res.status(201).json(players[randomNum]);
  
    } catch (error) {
      console.log("Error in players controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getDailyPlayer = async (req, res) => {
    try {
      
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const currentDate = `${day}-${month}-${year}`;
        const Dcorrect = date.getDay();
    
        const dailyPlayer = await Player.find({ currentDate });
  
      
      res.status(201).json(dailyPlayer);
  
    } catch (error) {
      console.log("Error in players controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getPlayers = async (req, res) => {
    try {
      //const { username, password } = req.body;
      const players = await Player.find({});
      
      
      res.status(201).json(players);
    } catch (error) {
      console.log("Error in players controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }   
  };

export const giveDailyDate = async (req, res) => {
   try {
     //const { username, password } = req.body;
     const players = await Player.find({});
     
     res.status(201).json(players);
   } catch (error) {
     console.log("Error in players controller", error.message);
     res.status(500).json({ error: "Internal Server Error" });
   }   
 };
  