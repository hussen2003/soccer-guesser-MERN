//authentification api
import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken';

const app_name = 'soccerdle-mern-ace81d4f14ec'
function buildPath(route)
{
  if (process.env.NODE_ENV === 'production')
  {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  }
  else
  {
    return 'http://localhost:3000/' + route;
  }
}

export const signup = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    const user = await User.findOne({ username });
  
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = new User({
        name,
        email,
        username,
        password: hashedPassword,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.ACCESS_TOKEN_SECRET);

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'soccerdle.verify.email@gmail.com',
          pass: 'dlom qktg fvci rgpl'
        }
      });

      let info = await transporter.sendMail({
      from: '"Soccerdle" <soccerdle.verify.email@gmail.com>',
      to: newUser.email,
      subject: 'Please verify your email',
      text: `Please verify your email by clicking on the following link: ${buildPath(`VerifyEmail/${token}`)}`
    });

      res.status(201).json({error: 'User created successfully, verification email sent'});
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "Username does not exist" });
    }

    if (!user.emailVerified) {
      return res.status(400).json({ error: "Email not verified" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const token = req.body.token;
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const updatedUser = await User.updateOne({ _id: payload.id }, { emailVerified: true });

    if (!updatedUser) {
      console.log("Error updating user: User not found");
      return res.status(400).json({ error: "User not found" });
    }

    res.status(200).json({ error: "Email verified successfully" });
  } catch (error) {
    console.log("Error in email verification", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  } 
}


export const getUsers = async (req, res) => {
  try {
    //const { username, password } = req.body;
    const username = "test";
    const users = await User.find({ username });

    res.status(201).json(users);
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
