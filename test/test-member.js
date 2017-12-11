const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const should = chai.should();
const expect = chai.expect;
const faker = require('faker');
const {Member} = require('../models/member');
const {Account} = require('../models/account');
const {app, runServer, closeServer} = require('../server');
const{TEST_DATABASE_URL} = require('../config');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');

chai.use(chaiHttp);
let test_token = '';
let accountId = '';

function seedMemberData() {
  let accountId
  console.info('seeding member data');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push(generateTestMember());
  }
  let output = Member.insertMany(seedData);
  console.log(output);
  return output;
}

function generateTestMember() {
  let accountId
  return {
    name: faker.random.words(),
    accountId: accountId
  }
}

function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

describe('Members API resource', function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach( function(){
    let username = 'testB';
    let password = 'testPasswordB';
    let teamname = 'teamTestB';
    return Account.hashPassword(password).then(password =>
      Account.create({
          username,
          password,
          teamname
      })
      .then (function(accountId){
        return chai.request(app).post('/api/auth/login')
        .set('content-type','application/x-www-form-urlencoded')
        .send('username=testB')
        .send('password=testPasswordB')
        .then(function(res){
          test_token=res.body.authToken;
          accountId=res.body.account._id;
          console.log(accountId,'one');
          let output = seedMemberData();
          console.log(output);
          return output;
        })
      })
    );
  });

  afterEach(function() {
    return tearDownDb(TEST_DATABASE_URL);
  });

  after(function() {
    return closeServer();
  })

  describe('GET endpoint', function() {
    it('should return all existing members', function() {
      let res;
     // console.log(accountId,test_token);
      return chai.request(app)
        .get(`/api/accounts/${accountId}/members`)
        .set('Authorization', `Bearer ${test_token}`)
        .then(function(_res) {
          res = _res;
          //res.should.have.status(200);
          res.body.members.should.have.length.of.at.least(1);
          return Member.count();
        })
        .then(function(count) {
          res.body.members.should.have.lengthOf(count);
        });
    });

    it('should return members with right fields', function() {
      let resMember;
      let accountId;
      return chai.request(app)
        .get(`/api/accounts/${accId}/members`)
        .set('Authorization', `Bearer ${test_token}`)
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.members.should.be.a('array');
          res.body.members.should.have.length.of.at.least(1);
          console.log(res);
          res.body.members.forEach(function(member) {
            console.log(member);
            member.should.be.a('object');
            member.should.include.keys(
              'id', 'name', 'accountId');
          });
          resMember = res.body.member[0];
          accountId=res.body.account.id;
          return Member.findById(resMember.id);
        })
        .then(function(member) {

          resMember.id.should.equal(member.id);
          resMember.name.should.equal(member.name);
          resMember.accountId.should.equal(member.accountId);
        });
    });
  });

  describe('POST endpoint', function() {
    it('should add a new member', function() {
      const newMember = generateTestMember();

      return chai.request(app)
        .post(`/api/accounts/${accId}/members`)
        .set('Authorization', `Bearer ${test_token}`)
        .send(newMember)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'id', 'name', 'accountId');
          res.body.id.should.not.be.null;
          res.body.name.should.equal(newMember.name);
          res.body.accountId.should.equal(newMember.accountId); 
          console.log(newMember);        
          return Member.findById(res.body.id);
        })
        .then(function(member) {
          member.name.should.equal(newMember.name);
          (member.accountId + '').should.equal(newMember.accountId);
        });
    });
  });

  describe('PUT endpoint', function() {
    it('should update fields you send over', function() {
      const updateData = {
        name: 'La La'
      };

      return Member
        .findOne()
        .then(function(member) {
          updateData.id = member.id;
          return chai.request(app)
            .put(`/api/accounts/:accId/members/${member.id}`)
            .set('Authorization', `Bearer ${test_token}`)
            .send(updateData);
        })
        .then(function(res) {
          res.should.have.status(200);

          return Member.findById(updateData.id);
        })
        .then(function(member) {
          member.name.should.equal(updateData.name);
        });
      });
  });

  describe('DELETE endpoint', function() {
    it('delete a member by id', function() {

      let member;

      return Member
        .findOne()
        .then(function(_member) {
          member = _member;
          return chai.request(app).delete(`/api/accounts/${accId}/members/${memid}`).set('Authorization', `Bearer ${test_token}`);
        })
        .then(function(res) {
          res.should.have.status(204);
          return Member.findById(member.id);
        })
        .then(function(_member) {
          should.not.exist(_member);
        });
    });
  });
});
