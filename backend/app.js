const express = require('express');
const dotenv = require('dotenv');

// Load config
dotenv.config({ path: './config/config.env' });

const app = express();

app.get('/hello', function(req, res){
   res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`)
);