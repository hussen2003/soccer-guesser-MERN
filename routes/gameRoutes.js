import express from "express";
import { guesser} from "../controllers/gameController.js";

const router = express.Router();

router.post("/guesser", guesser);

//router.post("/jsonParser", jsonParser);




export default router;