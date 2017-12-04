const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const should = chai.should();
const expect = chai.expect;
const {Account} = require('../models/account');
const {app, runServer, closeServer} = require('../server');
const{TEST_DATABASE_URL} = require('../config');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
chai.use(chaiHttp);

describe('Account API', function() {
    const username = 'testUser';
    const password = 'testPassword';
    const teamname = 'TeamA';
    const usernameB = 'testUserB';
    const passwordB = 'testPasswordB';
    const teamname = 'TeamB';

    before(function() {
        return runServer(TEST_DATABASE_URL);
    });

    after(function() {
        return closeServer();
    });

    afterEach(function() {
        return Account.remove({});
    });

    describe('/api/accounts', function() {
        describe('POST', function() {
            it('Should reject if missing username', function() {
                return chai
                    .request(app)
                    .post('/api/accounts/register')
                    .send({password, teamname})
                    .then(() =>
                        expect.fail(null, null, 'Request should not succeed')
                    )
                    .catch(err => {
                        if (err instanceof chai.AssertionError) {
                            throw err;
                        }

                        const res = err.response;
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal('Missing field');
                        expect(res.body.location).to.equal('username');
                    });
            });
            it('Should reject if missing password', function() {
                return chai
                    .request(app)
                    .post('/api/accounts/register')
                    .send({
                        username,
                        teamname
                    })
                    .then(() =>
                        expect.fail(null, null, 'Request should not succeed')
                    )
                    .catch(err => {
                        if (err instanceof chai.AssertionError) {
                            throw err;
                        }
                        const res = err.response;
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal('Missing field');
                        expect(res.body.location).to.equal('password');
                    });
            });
            it('Should reject accounts with non-string username', function() {
                return chai
                    .request(app)
                    .post('/api/accounts/register')
                    .send({
                        username: 1234,
                        password,
                        teamname
                    })
                    .then(() =>
                        expect.fail(null, null, 'Request should not succeed')
                    )
                    .catch(err => {
                        if (err instanceof chai.AssertionError) {
                            throw err;
                        }
                        const res = err.response;
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Incorrect field type: expected string'
                        );
                        expect(res.body.location).to.equal('username');
                    });
            });
            
            it('Should reject accounts with empty username', function() {
                return chai
                    .request(app)
                    .post('/api/accounts/register')
                    .send({
                        username: '',
                        password,
                        teamname
                    })
                    .then(() =>
                        expect.fail(null, null, 'Request should not succeed')
                    )
                    .catch(err => {
                        if (err instanceof chai.AssertionError) {
                            throw err;
                        }

                        const res = err.response;
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Must be at least 1 characters long'
                        );
                        expect(res.body.location).to.equal('username');
                    });
            });
            it('Should reject accounts with password less than six characters', function() {
                return chai
                    .request(app)
                    .post('/api/accounts/register')
                    .send({
                        username,
                        password: '1234',
                        teamname
                    })
                    .then(() =>
                        expect.fail(null, null, 'Request should not succeed')
                    )
                    .catch(err => {
                        if (err instanceof chai.AssertionError) {
                            throw err;
                        }
                        const res = err.response;
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Must be at least 6 characters long'
                        );
                        expect(res.body.location).to.equal('password');
                    });
            });
            it('Should reject accounts with password greater than 72 characters', function() {
                return chai
                    .request(app)
                    .post('/api/accounts/register')
                    .send({
                        username,
                        password: new Array(73).fill('a').join(''),
                        teamname
                    })
                    .then(() =>
                        expect.fail(null, null, 'Request should not succeed')
                    )
                    .catch(err => {
                        if (err instanceof chai.AssertionError) {
                            throw err;
                        }
                        const res = err.response;
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Must be at most 72 characters long'
                        );
                        expect(res.body.location).to.equal('password');
                    });
            });
            it('Should reject accounts with duplicate username', function() {
                return Account.create({
                    username,
                    password,
                    teamname
                })
                    .then(() =>
                        chai.request(app).post('/api/accounts/register').send({
                            username,
                            password,
                            teamname
                        })
                    )
                    .then(() =>
                        expect.fail(null, null, 'Request should not succeed')
                    )
                    .catch(err => {
                        if (err instanceof chai.AssertionError) {
                            throw err;
                        }

                        const res = err.response;
                        expect(res).to.have.status(422);
                        expect(res.body.reason).to.equal('ValidationError');
                        expect(res.body.message).to.equal(
                            'Username already taken'
                        );
                        expect(res.body.location).to.equal('username');
                    });
            });
            it('Should create a new account', function() {
                return chai
                    .request(app)
                    .post('/api/accounts/register')
                    .send({
                        username,
                        password,
                        teamname
                    })
                    .then(res => {
                        expect(res).to.have.status(201);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.contain.keys('username','password','teamname','id');
                        expect(res.body.username).to.equal(username);
                        expect(res.body.teamname).to.equal(teamname);
                        return Account.findOne({
                            username
                        });
                    })
                    .then(account => {
                        expect(account).to.not.be.null;
                        expect(account.teamname).to.equal(teamname);
                        return account.validatePassword(password);
                    })
                    .then(passwordIsCorrect => {
                        expect(passwordIsCorrect).to.be.true;
                    });
            });
        });
    });
});
