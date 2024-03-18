import express from "express";
import { updateGuess, getGuesses, endGame, leaderboard, updateScore } from "../controllers/dailyController.js";

const router = express.Router();

router.post("/leaderboard", leaderboard);

router.post("/updateScore", updateScore);

router.post("/endGame", endGame);

router.post("/updateGuess", updateGuess);

router.post("/getGuesses", getGuesses);


export default router;