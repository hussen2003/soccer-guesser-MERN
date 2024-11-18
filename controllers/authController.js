//authentification api
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const app_name = 'sd-group1-7db20f01361c';
function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'http://localhost:3000/' + route;
  }
}

export const signup = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    const userByUsername = await User.findOne({ username });
    const userByEmail = await User.findOne({ email });
    if (userByUsername) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    if (userByEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
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
          pass: 'dlom qktg fvci rgpl',
        },
      });

      let info = await transporter.sendMail({
        from: '"Soccerdle" <soccerdle.verify.email@gmail.com>',
        to: newUser.email,
        subject: 'Please verify your email',
        text: `Please verify your email by clicking on the following link: ${buildPath(`VerifyEmail/${token}`)}`,
      });

      res.status(201).json({ error: 'User created successfully, verification email sent' });
    }
  } catch (error) {
    console.log('Error in signup controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: 'Username does not exist' });
    }

    if (!user.emailVerified) {
      return res.status(400).json({ error: 'Email not verified' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      token: token,
    });
  } catch (error) {
    console.log('Error in login controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const token = req.body.token;
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const updatedUser = await User.updateOne({ _id: payload.id }, { emailVerified: true });

    if (!updatedUser) {
      console.log('Error updating user: User not found');
      return res.status(400).json({ error: 'User not found' });
    }

    res.status(200).json({ error: 'Email verified successfully' });
  } catch (error) {
    console.log('Error in email verification', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUsers = async (req, res) => {
  try {
    //const { username, password } = req.body;
    // const username = "test";
    const users = await User.find();

    res.status(201).json(users);
  } catch (error) {
    console.log('Error in login controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { username } = req.body;

    const userByUsername = await User.findOne({ username });
    if (!userByUsername) {
      return res.status(400).json({ error: 'Username does not exist' });
    } else {
      await User.deleteOne({ username: username });
      res.status(201).json({ error: 'User delete successfully' });
    }
  } catch (error) {
    console.log('Error in delete endpoint', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Email does not exist' });
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'soccerdle.verify.email@gmail.com',
        pass: 'dlom qktg fvci rgpl',
      },
    });

    let resetLink = `${buildPath(`UpdatePassword/${resetToken}`)}`;

    await transporter.sendMail({
      from: '"Soccerdle" <soccerdle.verify.email@gmail.com>',
      to: user.email,
      subject: 'Password Reset',
      text: `You requested for a password reset. Please click on the following link to reset your password: ${resetLink}`,
    });

    res.status(200).json({ message: 'Password reset link has been sent to your email' });
  } catch (error) {
    console.log('Error in forgetPassword controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { newPassword, token } = req.body;
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.log('Error in updatePassword controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateName = async (req, res) => {
  try {
    const { newName, username } = req.body;

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    await User.updateOne({ username: username }, { name: newName });

    await user.save();

    res.status(200).json({ message: 'Name updated successfully' , newName: newName });
  } catch (error) {
    console.log('Error in updateName controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateUsername = async (req, res) => {
  try {
    const { newUsername, username } = req.body;

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    const newUser = await User.findOne({ username: newUsername });
    if (newUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    
    await User.updateOne({ username: username }, { username: newUsername });

    await user.save();

    res.status(200).json({ message: 'Username updated successfully', newUser: newUsername });
  } catch (error) {
    console.log('Error in updateUsername controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const obtainUser = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user: user });
  } catch (error) {
    console.error('Error in obtainUser:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
