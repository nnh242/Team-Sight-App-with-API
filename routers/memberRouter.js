const express=require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {Member} = require('../models/member');
router.use(jsonParser);
const passport = require ('passport');
const  jwt = require('jsonwebtoken');
const jwtAuth = passport.authenticate('jwt', {session:false});
const catchError = (err,res) => {
    return res.status(500).json({error:'Something went wrong in the server'})
}

//this endpoint api/members is protected
router.get('/',jwtAuth, (req, res) => {
    Member
    .find({'accountId': req.user.id})
    .then(members => {
        res.json({members: members.map((member => member.apiRepr()))
        });
      })
      .catch(catchError);
  }); 

router.post('/',jwtAuth, jsonParser, (req,res) => {
    const requiredFields = ['name'];
    const missingField = requiredFields.find(field => !(field in req.body));
    if (missingField) {
        return res.status(422).json({
        code: 422,
        reason: 'ValidationError',
        message: 'Missing field',
        location: missingField
        });
    }
    Member
    .create({name: req.body.name,  accountId:req.user.id})
    .then(member => {
        res.status(201).json(member.apiRepr())})
    .catch((err) => {
        return res.status(500).json({error: 'Something went wrong'});
    })
    .catch((err) => {
    return res.status(500).json({error: 'Something went wrong'});
    });
});

//getting an member of the database by member's id api/members/:id
router.get('/:id', jwtAuth, (req, res) => {
    Member
    .findById(req.params.id)
    .then(member => res.json(member.apiRepr()))
    .catch(catchError);
});

//Update member by id
router.put('/:id', jwtAuth, (req,res) => {
    if (req.params.id !== req.body.id) {
      console.error('Unmatched id in request and body');
      return res.status(400).send('Unmatched id in request and body');
    }
    const toUpdate = {};
    const updateableFields = ['name']
    updateableFields.forEach(field => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    });
    
    Member
    .findByIdAndUpdate(req.params.id, {$set: toUpdate}, {new: true})
    .then(member => res.status(200).json(member.apiRepr()))
    .catch(catchError);
});
//DELETE end point is /api/members/:id
router.delete('/:id', jwtAuth, (req,res) => {
    Member
    .findByIdAndRemove(req.params.id)
    .then(member => res.status(204).end())
    .catch(catchError)
});

module.exports = router;