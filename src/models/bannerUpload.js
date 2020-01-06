const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema({
    image:{
        type:Buffer
    }
},{
        timestamps:true
})

const bannerUpload = mongoose.model('banners',bannerSchema)

module.exports = bannerUpload