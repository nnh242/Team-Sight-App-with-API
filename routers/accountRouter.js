const express=require('express');
const router = express.Router();
const {Account} = require('../models/account');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
router.use(jsonParser);
const passport = require ('passport');
const  jwt = require('jsonwebtoken');
const jwtAuth = passport.authenticate('jwt', {session:false});
const catchError = (err,res) => {
    return res.status(500).json({error:'Something went wrong in the server'})
}
function validateUserFields(account) {
    const stringFields = ['username', 'password', 'teamname'];
    const nonStringField = stringFields.find(
        field => field in account && typeof account[field] !== 'string'
    );

    if (nonStringField) {
        return {
        code: 422,
        reason: 'ValidationError',
        message: 'Incorrect field type: expected string',
        location: nonStringField
        };
    }

    const explicityTrimmedFields = ['username', 'password'];
    const nonTrimmedField = explicityTrimmedFields.find(
        field => account[field].trim() !== account[field]
    );

    if (nonTrimmedField) {
        return {
        code: 422,
        reason: 'ValidationError',
        message: 'Cannot start or end with whitespace',
        location: nonTrimmedField
        };
    }

    const sizedFields = {
        username: { min: 1 },
        password: { min: 6, max: 72 }
    };
    const tooSmallField = Object.keys(sizedFields).find(field =>
        'min' in sizedFields[field] &&
        account[field].trim().length < sizedFields[field].min
    );
    const tooLargeField = Object.keys(sizedFields).find(field =>
        'max' in sizedFields[field] &&
        account[field].trim().length > sizedFields[field].max
    );

    if (tooSmallField || tooLargeField) {
        return {
        code: 422,
        reason: 'ValidationError',
        message: tooSmallField
            ? `Must be at least ${sizedFields[tooSmallField].min} characters long`
            : `Must be at most ${sizedFields[tooLargeField].max} characters long`,
        location: tooSmallField || tooLargeField
        };
    }
    return { valid: true };
}
//POST to '/api/accounts/register' endpoint
//CREATE a new account
router.post('/register', jsonParser, (req, res) => {
    const requiredFields = ['username', 'password', 'teamname'];
    const missingField = requiredFields.find(field => !(field in req.body));
    if (missingField) {
      return res.status(422).json({
        code: 422,
        reason: 'ValidationError',
        message: 'Missing field',
        location: missingField
      });
    }
  
    let userValid = {};
    if (validateUserFields(req.body).valid === true) {
      userValid = req.body;
    } else {
      let code = validateUserFields(req.body).code || 422;
      return res.status(code).json(validateUserFields(req.body));
    }
  
    let { username, password, teamname} = userValid;
  
    return Account.find({ username })
      .count()
      .then(count => {
        if (count > 0) {
          return Promise.reject({
            code: 422,
            reason: 'ValidationError',
            message: 'Username already taken',
            location: 'username'
          });
        }
        return Account.hashPassword(password);
      })
      .then(hash => {
        return Account
        .create({ username, password: hash, teamname, members})
        .populate(members)
        .exec();
      })
      .then(account => {
          console.log('new', account);
        return res.status(201).json(account.apiRepr());
      })
      .catch(err => {
          return res.status(err.code).json(err);
      });
  });
//GET api/accounts/:id
router.get('/:accId',jwtAuth,(req,res) => {
    Account
    .findById(req.params.accId)
    .then(account => res.json(account.apiRepr()))
    .catch(catchError);
});
module.exports = router;