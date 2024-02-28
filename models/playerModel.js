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
            enum: ["ST", "LW", "RW", "CAM", "CM", 
            "CDM", "LB", "RB", "CB", "GK"]
        },
        country:{
            type: String,
            required: true
        },
        club:{
            type: String,
            required: true
        },
    }]
});

const Player = mongoose.model("players", playerSchema);

export default Player;