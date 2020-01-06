const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    region:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }

})

const location = mongoose.model('locationManagement',locationSchema)

module.exports = location