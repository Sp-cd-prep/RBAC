// // routes/protectedRoutes.js
// const express = require('express');
// const router = express.Router();
// const { authenticate, authorizeRoles } = require('../middleware/auth');
// const ROLES = require('../config/roles');

// router.get('/admin', authenticate, authorizeRoles(ROLES.ADMIN), (req, res) => {
//   res.json({ message: `Hello Admin ${req.user.username}` });
// });

// router.get('/user', authenticate, authorizeRoles(ROLES.USER, ROLES.ADMIN), (req, res) => {
//   res.json({ message: `Hello User ${req.user.username}` });
// });

// router.get('/public', (req, res) => {
//   res.json({ message: 'This is a public endpoint' });
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRoles } = require('../middleware/auth');
const ROLES = require('../config/roles');

router.get('/admin', authenticateJWT, authorizeRoles(ROLES.ADMIN), (req, res) => {
  res.json({ message: `Hello Admin ${req.user.username}` });
});

router.get('/user', authenticateJWT, authorizeRoles(ROLES.USER, ROLES.ADMIN), (req, res) => {
  res.json({ message: `Hello User ${req.user.username}` });
});

router.get('/public', (req, res) => {
  res.json({ message: 'This is a public endpoint' });
});

module.exports = router;
