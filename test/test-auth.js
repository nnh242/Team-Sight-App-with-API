const chai = require('chai');
const chaiHttp = require('chai-http');

const mongoose = require('mongoose');
const should = chai.should();

const {Account} = require('../models/account');
const {app, runServer, closeServer} = require('../server');
const{TEST_DATABASE_URL} = require('../config');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
const expect = chai.expect;
chai.use(chaiHttp);
chai.use(require('chai-shallow-deep-equal'));

describe('Auth endpoints', function() {
    const username = 'testUser';
    const password = 'testPassword';
    const teamname = 'TestTeam';
    before(function() {
        return runServer(TEST_DATABASE_URL);
    });

    after(function() {
        return closeServer();
    });
//before each test account is created and password is hashed
    beforeEach(function() {
        return Account.hashPassword(password).then(password =>
            Account.create({
                username,
                password,
                teamname
            })
        );
    });

    afterEach(function() {
        return Account.remove({});
    });

    describe('/api/auth/login', function() {
        it('Should reject requests with incorrect usernames', function() {
            return chai
                .request(app)
                .post('/api/auth/login')
                .auth('wrongUsername', password)
                .then(() =>
                    expect.fail(null, null, 'Request should not succeed')
                )
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }

                    const res = err.response;
                    expect(res).to.have.status(400);
                });
        });
        it('Should reject requests with incorrect passwords', function() {
            return chai
                .request(app)
                .post('/api/auth/login')
                .auth(username, 'wrongPassword')
                .then(() =>
                    expect.fail(null, null, 'Request should not succeed')
                )
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }

                    const res = err.response;
                    expect(res).to.have.status(400);
                });
        });
        it('Should return a valid auth token', function() {
            return chai
                .request(app)
                .post('/api/auth/login')
                //.auth('testUser','testPassword')
                .set('content-type','application/x-www-form-urlencoded')
                .send('username=testUser')
                .send('password=testPassword')
                .then(res => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    const token = res.body.authToken;
                    expect(token).to.be.a('string');
                    const payload = jwt.verify(token, JWT_SECRET, {
                        algorithm: ['HS256']
                    });
                    expect(payload.account).to.shallowDeepEqual({
                        username,
                        teamname
                    });
                });
        });
    });

    describe('/api/auth/refresh', function() {
        it('Should reject requests with an invalid token', function() {
            const token = jwt.sign(
                {
                    username,
                    teamname
                },
                'wrongSecret',
                {
                    algorithm: 'HS256',
                    expiresIn: '7d'
                }
            );

            return chai
                .request(app)
                .post('/api/auth/refresh')
                .set('Authorization', `Bearer ${token}`)
                .then(() =>
                    expect.fail(null, null, 'Request should not succeed')
                )
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }

                    const res = err.response;
                    expect(res).to.have.status(401);
                });
        });
        it('Should reject requests with an expired token', function() {
            const token = jwt.sign(
                {
                    account: {
                        username,
                        teamname
                    },
                    exp: Math.floor(Date.now() / 1000) - 10 // Expired ten seconds ago
                },
                JWT_SECRET,
                {
                    algorithm: 'HS256',
                    subject: username
                }
            );

            return chai
                .request(app)
                .post('/api/auth/refresh')
                .set('authorization', `Bearer ${token}`)
                .then(() =>
                    expect.fail(null, null, 'Request should not succeed')
                )
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }

                    const res = err.response;
                    expect(res).to.have.status(401);
                });
        });
        it('Should return a valid auth token with a newer expiry date', function() {
            const token = jwt.sign(
                {
                    account: {
                        username,
                        teamname
                    }
                },
                JWT_SECRET,
                {
                    algorithm: 'HS256',
                    subject: username,
                    expiresIn: '7d'
                }
            );
            const decoded = jwt.decode(token);

            return chai
                .request(app)
                .post('/api/auth/refresh')
                .set('authorization', `Bearer ${token}`)
                .then(res => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    const token = res.body.authToken;
                    expect(token).to.be.a('string');
                    const payload = jwt.verify(token, JWT_SECRET, {
                        algorithm: ['HS256']
                    });
                    expect(payload.account).to.deep.equal({
                        username,
                        teamname
                    });
                    expect(payload.exp).to.be.at.least(decoded.exp);
                });
        });
    });
});
