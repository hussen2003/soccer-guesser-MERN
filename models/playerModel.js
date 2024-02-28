//models for player database collections/tables

import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    players: [{
        name: {
            type: String,
            required: true,
            unique: true
        },
        age:{
            type: Number,
            required: true
        },
        position:{
            type: String,
            required: true,
            enum: ["Striker", "Left Winger", "Right Winger", 
            "Attacking Midfielder", "Central Midfielder", 
            "Defensive Midfielder", "Left Back", "Right Back", 
            "Center Back", "Goalkeeper"]
        },
        country:{
            type: String,
            required: true
        },
        club:{
            type: String,
            required: true
        }
    }]
});

const Player = mongoose.model("Player", playerSchema);

export default Player;