const express = require('express');
export const router = express.Router();
const Astronaut = require('../models/astronauts');

//get a list of astronauts from db

router.get('/astronauts',(req:any,res:any,next:string)=>{
    let filter = {_id : req.query.id, isDeleted  : false}
    Astronaut.find(filter,(err:string,data:any)=>{
        if (data.length >0){
            res.send(data);
        }else{
            res.send('team data is deleted');
        }
     }).catch(next);
});

//add a new Astronaut to the db
router.post('/astronauts',(req:any,res:any,next:string)=>{
    Astronaut.create(req.body).then((astronaut:object)=>{
        res.send(astronaut);
    }).catch(next);
});

//updating the db
router.put('/astronauts/:id',(req:any,res:any,next:string)=>{
    Astronaut.findByIdAndUpdate({_id: req.params.id},req.body).then(()=>{
        Astronaut.findOne({_id : req.params.id}).then((astronaut :object)=>{
            res.send(astronaut);
        });
    });
});


//updating the pictures in db
router.put('/astronauts/pictures/:id',(req : any,res:any,next:string)=>{
    Astronaut.findByIdAndUpdate({_id: req.params.id},{$push:{pictures:{$each: req.body.pictures}}}).then(()=>{
        Astronaut.findOne({_id : req.params.id}).then(function(astronaut :object){
            res.send(astronaut);
        }); 
    });
});

//deleting a astronaut from the db
router.delete('/astronauts/:id',(req :any,res :any,next:string)=> {
    Astronaut.findByIdAndUpdate({_id: req.params.id},{isDeleted : true}).then(()=>{
        Astronaut.findOne({_id : req.params.id}).then((astronaut: object)=>{
        res.send(astronaut);
        });     
    });
});
