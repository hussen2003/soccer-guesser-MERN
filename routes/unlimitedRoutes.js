import express from "express";
import { collectlux, updateScore, collectSensorData } from "../controllers/unlimitedController.js";

const router = express.Router();

router.post("/collectlux", collectlux);
router.post("/collectsensordata", collectSensorData);
router.post("/updateScore", updateScore);


export default router;