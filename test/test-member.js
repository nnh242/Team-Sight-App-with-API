const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const should = chai.should();
const expect = chai.expect;
const {Member} = require('../models/member');
const {app, runServer, closeServer} = require('../server');
const{TEST_DATABASE_URL} = require('../config');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
let test_token = "";
chai.use(chaiHttp);

let test_token = "";

function seedItemData() {
  console.info('seeding member data');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push(generateTestItem());
  }
  
  return Member.insertMany(seedData);
}

function generateTestItem() {
  return {
    name: faker.random.words(),
    accountId: userId
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

  beforeEach(function() {
      return chai.request(app)
          .post('/api/account/register')
          .send({username:"testB", password:"1234567890", teamName:"TestB"})
          .then(function(res) {
            userId = res.body.id; 
            console.log(userId);
            return chai.request(app).post('/api/auth/login')
                     .send({username:"testB", password:"1234567890"})
                     .then(function(res){test_token = res.body.authToken;})})
          .then(function(){return seedItemData()});
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
      return chai.request(app)
        .get('/api/members')
        .set('Authorization', `Bearer ${test_token}`)
        .then(function(_res) {
          res = _res;
          res.should.have.status(200);
          res.body.members.should.have.length.of.at.least(1);
          return Member.count();
        })
        .then(function(count) {
          console.log(res.body);
          res.body.members.should.have.lengthOf(count);
        });
    });

    it('should return members with right fields', function() {
      let resItem;
      return chai.request(app)
        .get('/api/members')
        .set('Authorization', `Bearer ${test_token}`)
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.members.should.be.a('array');
          res.body.members.should.have.length.of.at.least(1);

          res.body.members.forEach(function(member) {
            member.should.be.a('object');
            member.should.include.keys(
              'id', 'name', 'accountId');
          });
          resItem = res.body.members[0];
          return Member.findById(resItem.id);
        })
        .then(function(member) {

          resItem.id.should.equal(member.id);
          resItem.name.should.equal(member.name);
          resItem.accountId.should.equal(member.accountId+'');
        });
    });
  });

  describe('POST endpoint', function() {
    it('should add a new member', function() {
      const newItem = generateTestItem();

      return chai.request(app)
        .post('/api/members')
        .set('Authorization', `Bearer ${test_token}`)
        .send(newItem)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'id', 'name', 'accountId');
          res.body.id.should.not.be.null;
          res.body.name.should.equal(newItem.name);
          res.body.accountId.should.equal(newItem.accountId);         
          return Member.findById(res.body.id);
        })
        .then(function(member) {
          member.name.should.equal(newItem.name);
          (member.accountId + '').should.equal(newItem.accountId +'');
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
            .put(`/api/members/${member.id}`)
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
          return chai.request(app).delete(`/api/members/${member.id}`).set('Authorization', `Bearer ${test_token}`);
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
