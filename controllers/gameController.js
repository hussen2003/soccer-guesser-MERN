//game api

import Player from "../models/playerModel.js";


export const guesser = async (req, res) => {
  try {
    
    const { guess, player } = req.body;

    var player = "player";
    var nameLength = player.length;
    var letters = []; // number coded: 0 for not in name, 1 for in name but wrong place, 2 for in name and correct place
    var result;
    if(player == guess){
      result = "correct";
      for (let i = 0; i < nameLength; i++) {
        letters.push(2);
      }
    }else{
      result = "incorrect";
      for (let i = 0; i < nameLength; i++) {
        if(guess[i] == player[i])
          letters.push(2);
        else if(player.includes(guess[i]))
          letters.push(1)
        else
          letters.push(0);
      }
    }

    
    res.status(201).json({
      result: result,
      letters: letters
    });

  } catch (error) {
    console.log("Error in unlimited controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



// export const jsonParser = async (req, res) => {
//   try {
      
      
//       req.body.forEach(element => {
//         console.log( element.username );
//       });

//       res.status(201).json("hello");


//   } catch (error) {
//     console.log("Error in game controller", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

