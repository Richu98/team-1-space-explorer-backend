const express = require('express');
const router = express.Router();
const Astronaut = require('../models/astronauts');

//get a list of ninjas from db

router.get('/astronauts',function(req,res,next){
    let filter = {teamName : req.query.teamName}
    Astronaut.find(filter,function(err,data){
        if (err) throw err;        
        res.send(data);
     });
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

//deleting a astronaut from the db
router.delete('/astronauts/:id',function(req,res,next){
    Astronaut.findByIdAndRemove({_id: req.params.id}).then(function(astronaut){
        res.send(astronaut);     
    });
});

module.exports = router;