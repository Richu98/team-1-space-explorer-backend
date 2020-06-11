const express = require('express');
const router = express.Router();
const Astronaut = require('../models/astronauts');

//get a list of astronauts from db

router.get('/astronauts',function(req,res,next){
    let filter = {_id : req.query.id, isDeleted  : false}

    Astronaut.find(filter,function(err,data){
        if (data.length >0){
            res.send(data);
        }else{
            res.send('team data is deleted');
        }
     }).catch(next);
});

//add a new Astronaut to the db
router.post('/astronauts',function(req,res,next){
    Astronaut.create(req.body).then(function(astronaut){
        res.send(astronaut);
    }).catch(next);
});

//updating the db
router.put('/astronauts/:id',function(req,res,next){
    Astronaut.findByIdAndUpdate({_id: req.params.id},req.body).then(function(){
        Astronaut.findOne({_id : req.params.id}).then(function(astronaut){
            res.send(astronaut);
        });
    });
});


//updating the pictures in db
router.put('/astronauts/pictures/:id',function(req,res,next){
    Astronaut.findByIdAndUpdate({_id: req.params.id},{$push:{pictures:{$each: req.body.pictures}}}).then(function(){
        Astronaut.findOne({_id : req.params.id}).then(function(astronaut){
            res.send(astronaut);
        });
    });
});

//deleting a astronaut from the db
router.delete('/astronauts/:id',function(req,res,next){
    Astronaut.findByIdAndUpdate({_id: req.params.id},{isDeleted : true}).then(function(){
        Astronaut.findOne({_id : req.params.id}).then(function(astronaut){
        res.send(astronaut);
        });     
    });
});

module.exports = router;
