import express from "express";
import { getGuesses, endGame, leaderboard, updateScore } from "../controllers/dailyController.js";

const router = express.Router();

router.post("/leaderboard", leaderboard);

router.post("/updateScore", updateScore);

router.post("/endGame", endGame);

router.get("/getGuess", getGuesses);


export default router;