import express from "express";
import { collectlux, updateScore } from "../controllers/unlimitedController.js";

const router = express.Router();

router.post("/collectlux", collectlux);

router.post("/updateScore", updateScore);


export default router;