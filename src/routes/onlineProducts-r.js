const express = require('express')
const multer = require('multer')
const csv = require('csvtojson')
const onlineProducts = require('./../models/onlineProducts')
const router = new express.Router()

const upload = multer({
    // dest:'csv',
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(csv)$/)){
            return cb(new Error('please upload an csv'))
        }

        cb(undefined,true)
    }
})

router.post('/online_product',upload.single('file'),async(req,res)=>{
    try{
        const jsonArray = await csv().fromString(req.file.buffer.toString())
         jsonArray.forEach(element =>{
    
            const onlineProduct = new onlineProducts({
                ...element,
               
            })
            onlineProduct.save().then((data)=>{
                console.log(data)
            })
            
            }
        )
        res.status(200).send()
    }
    catch(e){
        console.log(e)
        res.status(400).send(e)

    }
})

router.get('/get_online_products',async(req,res)=>{
    try{
        const data = await onlineProducts.find({})
        res.send(data)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router