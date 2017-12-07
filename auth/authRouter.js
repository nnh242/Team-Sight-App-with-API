const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
//create a jwt token when client sends username and password
const createAuthToken = account => {
    return jwt.sign({account}, config.JWT_SECRET, {
        subject: account.username,
        expiresIn: config.JWT_EXPIRY,
        algorithm: 'HS256'
    });
};

const router = express.Router();
// this is endpoint api/auth/login, username and pw are used to create token
router.post('/login',
    passport.authenticate('local'),
    (req, res) => {
        const authToken = createAuthToken(req.user);
        res.json({authToken: authToken, account: req.user}); 
    }
);
// this is endpoint api/auth/refresh
router.post('/refresh',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const authToken = createAuthToken(req.user);
        res.json({authToken}); 
    }
);

module.exports = router;