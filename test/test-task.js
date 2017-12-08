const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const should = chai.should();
const expect = chai.expect;
const {Task} = require('../models/task');
const {Member} = require('../models/member');
const {Account} = require('../models/account');
const {app, runServer, closeServer} = require('../server');
const{TEST_DATABASE_URL} = require('../config');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
let test_token = "";
chai.use(chaiHttp);

