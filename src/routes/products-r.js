const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const csv = require('csvtojson')
const products = require('./../models/product')
const auth = require('./../middleware/auth')
const storeAuth = auth.auth
const fs = require('fs')
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


router.post('/product', upload.single('file') , storeAuth , async(req,res)=>{
 
    if(req.file){
    try{
        const jsonArray = await csv().fromString(req.file.buffer.toString())
         jsonArray.forEach(element =>{
    
            const product = new products({
                ...element,
                vendor:req.store._id
            })
            product.save().then((data)=>{
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
}else{
    try{
        const  product= new products({
            ...req.body,
            vendor:req.store._id
        })
            await product.save()
            res.status(200).send(product)
    }
        catch(e){
            res.status(400).send(e)
        }
    
}
    
})

router.get('/products',storeAuth,async(req,res)=>{
    try{
        const data = await products.find({})
        res.send(data)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/products_by_id/:id',async(req,res)=>{
    try{
        const data = await products.findById(req.params.id)
        res.send(data)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/products/delete/:id',async(req,res)=>{
    try{
        const id =req.params.id
        await products.findByIdAndDelete(req.params.id)
        res.status(200)
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

router.patch('/products/change_status/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const product = await products.findById(id)
        product.status = req.body.status
    }catch(e){
        console.log(e)
        res.status.send(e)
    }
})

csv2Productmodel=(ele)=>{
    
    const product = new products({
        ...ele,
        vendor:req.store._id
    })
    product.save().then((data)=>{
        console.log(data)
    })
    // console.log(...ele)
    }

module.exports = router