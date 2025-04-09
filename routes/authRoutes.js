const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { findUser } = require('../users/users');
const { SECRET_KEY } = require('../middleware/auth');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = findUser(username, password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const payload = { id: user.id, username: user.username, role: user.role };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
