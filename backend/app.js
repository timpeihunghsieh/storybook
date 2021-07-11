const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const MongoDbStore = require('connect-mongo');

const connectDB = require('./config/db');

// Load config
dotenv.config({ path: './config/config.env' });

// Passport config
require('./config/passport')(passport);

connectDB();

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoDbStore.create({
        mongoUrl: 'mongodb://localhost:27017/storybooks-app'
    })
  })
 );

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/hello', function(req, res){
   res.send("Hello World!");
});
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));
app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`)
);