
const express = require('express');
const app = express();
const protectedRoutes = require('./routes/protectedRoutes');
const authRoutes = require('./routes/authRoutes')

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

const PORT = 3100;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



