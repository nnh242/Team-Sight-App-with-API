'use strict';
require ('dotenv').config();
const {PORT, DATABASE_URL, JWT_SECRET} = require('./config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//LOGGING
const morgan = require('morgan');
app.use(morgan('common'));

//MONGOOSE
const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;

//routers
const accountRouter = require('./routers/accountRouter');
const memberRouter = require('./routers/memberRouter');
const authRouter= require('./auth/authRouter');

//serving static assets in public folder
app.use(express.static('public'));

//routes to endpoints
app.use('/api/accounts', accountRouter);
app.use('/api/members',memberRouter)
app.use('/api/auth', authRouter);

app.get('/api/*', (req, res) => {
  res.json({ok: true});
});

//catching all unintended endpoints
app.use('*', function (req,res) {
  res.status(404).json({message:'Not Found'});
});

// CORS
const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');
app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
      return res.send(204);
  }
  next();
});
const passport = require('passport');
const {localStrategy, jwtStrategy }= require ('./auth/strategies');

//passport authentication
app.use(passport.initialize());
passport.use('local',localStrategy);
passport.use('jwt', jwtStrategy);

// run server and close server function for tests
let server;
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, {useMongoClient: true}, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}
  
function closeServer() {
  return mongoose.disconnect().then(() => {
      return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
      });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};