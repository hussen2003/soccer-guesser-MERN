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
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      date = new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: "America/New_York"}));
      // const dailyDate = "Thu Mar 28 2024 00:00:00 GMT-0400 (Eastern Daylight Time)";
      const dailyDate = date + "";
    
      const dailyPlayer = await Player.findOne({ dailyDate });
  
      res.status(201).json(dailyDate);
  
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
    var randomNum;
    const addedDaily = [];
    const indexes = [];
   try {
     const players = await Player.find({});
     var start = new Date();
     var end = new Date();
     const startDate = start.getDate();
    
     for (let i = 0; i < players.length; i++) {
      var usedNumber = true;
      while(usedNumber){
        randomNum = Math.round( Math.random() * (players.length - 1) );
        if(addedDaily.includes(randomNum) == false){
        usedNumber = false;
        addedDaily.push(randomNum);
        end.setDate(startDate + i);
        end.setHours(0);
        end.setMinutes(0);
        end.setSeconds(0);
        end.setMilliseconds(0);
        end = new Date((typeof end === "string" ? new Date(end) : end).toLocaleString("en-US", {timeZone: "America/New_York"}));
        players[randomNum].dailyDate = "" + end;
        end = new Date();
        await players[randomNum].save();

        }
      }
     }  

    // for(var i = 0; i < players.length; i++) {
    //   players[i].dailyDate = "";
    //   players[i].save();
    // }


     //res.status(201).json("successfully added daily");
     const dates = players.map((player) => player.dailyDate);
     res.status(201).json(dates);
   } catch (error) {
     console.log("Error in players controller", error.message);
     res.status(500).json({ error: "Internal Server Error" });
   }   
 };
  