// // middleware/auth.js

// function authenticate(req, res, next) {
//   const { username, password } = req.headers;
//   console.log(username,password,"line 5");

//   if (!username || !password) {
//     return res.status(400).json({ message: 'Missing credentials' });
//   }

//   const { findUser } = require('../users/users');
//   const user = findUser(username, password);
//   console.log(user,"user")

//   if (!user) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }

//   req.user = user;
//   next();
// }

// function authorizeRoles(...allowedRoles) {
//   return (req, res, next) => {
//     if (!req.user || !allowedRoles.includes(req.user.role)) {
//       return res.status(403).json({ message: 'Access denied' });
//     }
//     next();
//   };
// }

// module.exports = { authenticate, authorizeRoles };


const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key'; // In production, use env variables!

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
}

module.exports = { authenticateJWT, authorizeRoles, SECRET_KEY };
