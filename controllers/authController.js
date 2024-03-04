//authentification api

import User from "../models/userModel.js";

export const signup = async (req, res) => {
  try {
    const { name, email, username, password, score } = req.body;
    //implement confirm password
    const user = await User.findOne({ username });
    //hash password


    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    } else {
      const newUser = new User({
      name,
      email,
      username,
      password,
      score: score || 0,
      });

      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        score: score || 0,
      });

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

    if (password != user.password) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      score: user.score,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    //const { username, password } = req.body;
    const users = await User.find({}).select({ "username": 1, "password": 1, "_id": 1});

    res.status(201).json(users);
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
