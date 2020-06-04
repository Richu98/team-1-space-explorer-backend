const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//set up express App
const app = express();

//connect to mongodb
mongoose.connect('mongodb+srv://anikate12:anikate123@cluster0-py51n.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true});

//creating middleware of bodyParser
app.use(bodyParser.json());

//enabling cors
app.use(cors());

//initializing routes
app.use('/api',require('./routes/api'));

app.use(function(err,req,res,next){
    res.status(422).send({error : err.message})
});

app.listen(process.env.PORT || 4000,function(){
    console.log('now listening for requests')
});
