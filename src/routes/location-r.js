const express = require('express')
const location = require('./../models/location')
const router = new express.Router()

router.post('/location_management',async(req,res)=>{
    const data = req.body
    const newLocation = new location(data)
    try{
        await newLocation.save()
        console.log(newLocation)
        res.status(200).send(newLocation)
    }catch(e){
        res.status(400).send(e)
    }
    
})

router.get('/location_query',async(req,res)=>{
    try{
        // const region = req.query
        const place = req.query.region
        const cat = req.query.category
        const data = await location.find({region:place,category:cat})
        res.status(200).send(data)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router