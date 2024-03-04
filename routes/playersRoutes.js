import express from "express";
import {getPlayers, getRandomPlayer, getDailyPlayer} from "../controllers/playersController.js";

const router = express.Router();

router.post("/getPlayers", getPlayers);

router.post("/getRandomPlayer", getRandomPlayer);

router.post("/getDailyPlayer", getDailyPlayer);

export default router;