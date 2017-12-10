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
router.get('/:accId/members/:memId/tasks',jwtAuth, (req, res) => {
    console.log(req);
    console.log(res);
    Task
    .find({'accId': req.params.accId, 'memId':req.params.memId})
    .then(tasks => {
        res.json({tasks: tasks.map((task => task.apiRepr()))
        });
    })
    .catch(catchError);
}); 
//POST to /api/accounts/:id/members/:id/tasks
router.post('/:accId/members/:memId/tasks',jwtAuth, jsonParser, (req,res) => {
    const requiredFields = ['taskName','estimateTime','actualTime'];
    const missingField = requiredFields.find(field => !(field in req.body));
    if (missingField) {
        return res.status(422).json({
        code: 422,
        reason: 'ValidationError',
        message: 'Missing field',
        location: missingField
        });
    }
    console.log(req.params.accId,req.params.memId);
    Task
    .create({
        taskName: req.body.taskName, 
        estimateTime: req.body.estimateTime, 
        actualTime: req.body.actualTime,
        accountId: req.params.accId, 
        memberId: req.params.memId
    })
    .then(task => {
        res.status(201)
           .json(task.apiRepr())
    })
    .catch((err) => {
        console.log(err);
        return res.status(500)
                  .json({error: 'Something went wrong with the post req'});
    });
});

//getting an task of the database by task's id api/tasks/:id
router.get('/:accId/members/:memId/tasks/:id', jwtAuth, (req, res) => {
    Task
    .findById(req.params.id)
    .then(task => res.json(task.apiRepr()))
    .catch(catchError);
});

//Update task by id
router.put('/:accId/members/:memId/tasks/:id', jwtAuth, (req,res) => {
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
router.delete('/:accId/members/:memId/tasks/:id', jwtAuth, (req,res) => {
    Task
    .findByIdAndRemove(req.params.id)
    .then(task => res.status(204).end())
    .catch(catchError)
});

module.exports = router;