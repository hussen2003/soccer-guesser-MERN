import express from "express";
import {getUsers, login, signup, verifyEmail} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/getUsers", getUsers);

router.post("/verifyEmail", verifyEmail)




export default router;
