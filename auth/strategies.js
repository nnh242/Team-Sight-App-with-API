const passport = require ('passport');
const LocalStrategy = require ('passport-local');
const {JWT_SECRET} = require('../config');
const {Strategy: JwtStrategy,ExtractJwt} = require('passport-jwt');
const {Account} = require('../models/account');

const localStrategy = new LocalStrategy((username,password,callback) => {
    let account;
    console.log('one');
    Account.findOne({username})
        .then(_account => {account=_account;
        console.log('a');
        if(!account) {
            return Promise.reject({
                reason: 'LoginError',
                message:'Incorrect username or password'
            });
        }
        return account.validatePassword(password);
    })
    .then(isValid => {
        console.log('b');
        if (!isValid) {
            return Promise.reject({
              reason: 'LoginError',
              message: 'Incorrect username or password',
            });
          }
          return callback(null, account)
    })
    .catch(err => {
        console.log('c');
        if (err.reason === 'LoginError') {
          return callback(null, false, err);
        }
        return callback(err, false);
      });
})
const jwtStrategy = new JwtStrategy(
    {
        secretOrKey: JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        algorithms: ['HS256']
    },
    (payload, done) => {
        done(null, payload.account);
    }
  );
  
module.exports = {localStrategy,jwtStrategy};
