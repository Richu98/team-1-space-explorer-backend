const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  astronautSchema = new Schema({
    teamName :{
        type : String,
        required : [true,'Name field is required']
    },
    destination :{
        type : String,
        required : [true,'destination field is required']
    },
    teamMembers : {
        type : [String],
        required : [true,'there must be atleast one team member']
        
    },
    spaceshipName :{
        type : String,
        required : [true,'Spaceship Name field is required']
    },
    mission :{
        type : String,
        required : [true,'Mission Name field is required']
    },
    pictures :{

        type : [String]
    },
    isDeleted : {
        type : Boolean,
        default : false

    }
    
});

const Astronaut = mongoose.model('astronaut',astronautSchema);

module.exports = Astronaut;
