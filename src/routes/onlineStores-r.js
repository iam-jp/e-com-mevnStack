const express = require('express')
const onlineStores = require('./../models/onlineStores')

const router = new express.Router()

router.post('/online_stores',async(req,res)=>{
    const data = req.body
    // const jsobj = JSON.parse(data)
    const  store = new onlineStores(data)

    try{
        await store.save()
        res.status(200).send(store)
    }catch(e){
        res.status(400).send(e)
        console.log(e)
    }

    console.log(store)
})

router.get('/get_online_stores',async(req,res)=>{
    try{
        const data = await onlineStores.find({})
        
        res.status(200).send(data)
    }catch(e){
        res.status(404).send(e)
    }
})

module.exports = router