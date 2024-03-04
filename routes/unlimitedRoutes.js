import express from "express";
import { leaderboard, updateScore } from "../controllers/unlimitedController.js";

const router = express.Router();

router.post("/leaderboard", leaderboard);

router.post("/updateScore", updateScore);


export default router;