import express from "express";
import {getPlayers, getRandomPlayer, getDailyPlayer, giveDailyDate} from "../controllers/playersController.js";

const router = express.Router();

router.post("/getPlayers", getPlayers);

router.post("/getRandomPlayer", getRandomPlayer);

router.post("/getDailyPlayer", getDailyPlayer);

// router.post("/giveDailyDate", giveDailyDate);

export default router;