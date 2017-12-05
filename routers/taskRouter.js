const express=require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {Task} = require('../models/task');
router.use(jsonParser);
const passport = require ('passport');
const  jwt = require('jsonwebtoken');
const jwtAuth = passport.authenticate('jwt', {session:false});
const catchError = (err,res) => {
    return res.status(500).json({error:'Something went wrong in the server'})
}

//this endpoint /api/accounts/:id/members/:id/tasks is protected
router.get('/',jwtAuth, (req, res) => {
    Task
    .find({'accountId': req.account.id, 'memberId':req.member.id})
    .then(tasks => {
        res.json({tasks: tasks.map((task => task.apiRepr()))
        });
    })
    .catch(catchError);
}); 
//POST to /api/accounts/:id/members/:id/tasks
router.post('/',jwtAuth, jsonParser, (req,res) => {
    const requiredFields = ['taskName','estimateTime'];
    const missingField = requiredFields.find(field => !(field in req.body));
    if (missingField) {
        return res.status(422).json({
        code: 422,
        reason: 'ValidationError',
        message: 'Missing field',
        location: missingField
        });
    }
    Task
    .create({taskName: req.body.taskName,estimateTime: req.body.estimateTime, actualTime: req.body.actualTime, memberId:req.member.id,accountId:req.account.id})
    .then(task => {
        res.status(201).json(task.apiRepr())})
    .catch((err) => {
        return res.status(500).json({error: 'Something went wrong'});
    })
    .catch((err) => {
    return res.status(500).json({error: 'Something went wrong'});
    });
});

//getting an task of the database by task's id api/tasks/:id
router.get('/:id', jwtAuth, (req, res) => {
    Task
    .findById(req.params.id)
    .then(task => res.json(task.apiRepr()))
    .catch(catchError);
});

//Update task by id
router.put('/:id', jwtAuth, (req,res) => {
    if (req.params.id !== req.body.id) {
      console.error('Unmatched id in request and body');
      return res.status(400).send('Unmatched id in request and body');
    }
    const toUpdate = {};
    const updateableFields = ['taskName','estimateTime','actualTime'];
    updateableFields.forEach(field => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    });
    
    Task
    .findByIdAndUpdate(req.params.id, {$set: toUpdate}, {new: true})
    .then(task => res.status(200).json(task.apiRepr()))
    .catch(catchError);
});
//DELETE end point is /api/tasks/:id
router.delete('/:id', jwtAuth, (req,res) => {
    Task
    .findByIdAndRemove(req.params.id)
    .then(task => res.status(204).end())
    .catch(catchError)
});

module.exports = router;