const express = require('express');
const connectToMongo = require('./db');
const app = express();
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env' });

// Connect to MongoDB
connectToMongo();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'sfsedsdvsvjhffbdhsdfnfnfbdncbd', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, 
       httpOnly: true,sameSite:'None'
  } 
}));

// CORS setup
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend's URL
  credentials: true, // Allow cookies and other credentials to be sent
};
app.use(cors(corsOptions));

// Routes
app.get('/', (req, res) => {
  res.send('App is working');
});

app.use('/auth', require('./routes/authroute'));
app.use('/mobile', require('./routes/mobileroute'));
app.use('/cart', require('./routes/cartroute'));
app.use('/profile', require('./routes/profileroute'));

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
