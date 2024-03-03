import express from "express";
import { leaderboard } from "../controllers/landingController.js";

const router = express.Router();

router.post("/leaderboard", leaderboard);




export default router;