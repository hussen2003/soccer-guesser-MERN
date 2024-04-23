import express from 'express';
import { deleteUser, getUsers, login, signup, verifyEmail, forgetPassword, updatePassword, updateName, updateUsername } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/getUsers', getUsers);

router.post('/verifyEmail', verifyEmail);

router.post('/deleteUser', deleteUser);

router.post('/forgetPassword', forgetPassword);

router.post('/updatePassword', updatePassword);

router.post('/updateName', updateName);

router.post('/updateUsername', updateUsername);

export default router;
