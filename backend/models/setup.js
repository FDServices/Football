const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Login = require('./login');

// Create a new user
router.post('/', async (req, res) => {
  const { username, password, role } = req.body;

  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new Login({
    username,
    password: hashedPassword,
    role,
  });

  try {
    await newUser.save();
    res.status(201).json({ username });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create user.' });
  }
});


module.exports = router;
