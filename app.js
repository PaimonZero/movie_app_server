const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const qs = require('qs');
const env = require('./config/environment');
const initRoutes = require('./routes/indexRoutes');

const app = express();
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('query parser', (str) => qs.parse(str));

// Handle routes
initRoutes(app);

const PORT = env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
