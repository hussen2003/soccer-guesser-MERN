import express from "express";
import {getUsers, login, signup} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/getUsers", getUsers);




export default router;
