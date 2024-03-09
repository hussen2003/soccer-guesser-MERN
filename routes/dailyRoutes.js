import express from "express";
import { leaderboard, updateScore } from "../controllers/dailyController.js";

const router = express.Router();

router.post("/leaderboard", leaderboard);

router.post("/updateScore", updateScore);


export default router;