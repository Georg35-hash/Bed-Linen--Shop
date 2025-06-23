const bcrypt = require('bcrypt');
require('dotenv').config();
const User = require('../models/User.js');

const registerUser = async (req, res) => {
  console.log('Request body:', req.body); // <-- добавь это
  try {
    const { login, email, password, repPassword } = req.body;

    if (password !== repPassword) {
      return res
        .status(400)
        .json({ error: 'Please entry right repeat password' });
    }
    if (!login || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      login,
      email,
      password: hashPassword,
    });

    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = registerUser;
