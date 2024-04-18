import express from "express";
import {deleteUser, getUsers, login, signup, verifyEmail} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/getUsers", getUsers);

router.post("/verifyEmail", verifyEmail)

router.post("/deleteUser", deleteUser)


export default router;
