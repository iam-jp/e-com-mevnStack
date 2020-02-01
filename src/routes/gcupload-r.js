const express = require('express')
const multer = require('multer')
// const sharp = require('sharp')
const csv = require('csvtojson')
const gcModel = require('../models/globalCatalogue')
const router = new express.Router()


const upload = multer({
    dest:'csv',
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(xlsx|csv)$/)){
            return cb(new Error('please upload an xlsx/csv'))
        }

        cb(undefined,true)
    }
}) 

const model = null

router.post('/gcupload',upload.single('file') ,async (req,res)=>{
const jsonArray = await csv().fromFile(req.file.path)
// res.send(jsonArray)
// console.log(jsonArray)
try{
    jsonArray.forEach(element =>
        csv2model(element))
        res.status(200).send()
}catch(e){
    res.status(400).send(e)
}

})


router.get('/gcdisplay',async(req,res)=>{
    try{
        const data = await gcModel.find({})
        res.status(200).send(data)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/globalproducts/delete',async(req,res)=>{
    try{
        const id =req.body
        // await gcModel.findByIdAndDelete(req.params.id)
        res.status(200).send(id)
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})


csv2model=(ele)=>{
const gc = new gcModel(ele)
gc.save().then((data)=>{
    console.log(data)
})
}



module.exports = router