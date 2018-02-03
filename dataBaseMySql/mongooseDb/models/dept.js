var mongoose = require('mongoose');
var validator = require('validator');

var dept = mongoose.model('dept',{
    name:{
        type : String,
        required:true,
        minlength:1,
        trim:true,
        validate:{
            validator: 'isAlphanumeric',
            passIfEmpty: true,
            message: 'Name should contain alpha-numeric characters only'
        }
    },
    location: {
        type: String
    }
});

module.exports = {dept};