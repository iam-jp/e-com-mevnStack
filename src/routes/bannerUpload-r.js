const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const bannerupload = require('./../models/bannerUpload')
const router = new express.Router()


const upload = multer({
    // dest:'banners',
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('please upload an image'))
        }

        cb(undefined,true)
    }
})


router.post('/bannerupload',upload.single('file'), async (req,res)=>{
    const buffer = await sharp(req.file.buffer).jpeg().toBuffer()
    // console.log(req)
    const banner = new bannerupload({
        image:buffer
    })
    await banner.save()
    res.status(200)
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.get('/bannerupload/:id', async(req,res)=>{
    try{
        const banner = await bannerupload.findById(req.params.id)

        if(!banner){
            throw new Error()
        }

        res.set('Content-Type','image/jpeg')
        res.send(banner.image)
    }catch(e){
        res.status(404).send(e)
    }
})

router.get('/bannerupload', async (req,res)=>{
    try{
        const filelist = await bannerupload.find({}) 
        res.set('Content-Type','image/jpeg')
        res.send(filelist)
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete('/bannerupload/delete/:id', async (req, res) => {
    try {
        const banner = await bannerupload.findByIdAndDelete(req.params.id)

        if (!banner) {
            return res.status(404).send()
        }

        // res.redirect('/bannerupload')
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router