const express = require('express')
const stores = require('./../models/stores')
const auth = require('./../middleware/auth')
const router = new express.Router()

router.post('/stores',async(req,res)=>{
    const data = req.body
    // const jsobj = JSON.parse(data)
    const  store = new stores(data)

    try{
        await store.save()
        res.status(200).send(store)
    }catch(e){
        res.status(400).send(e)
    }

    console.log(store)
})

router.get('/stores',async(req,res)=>{
    try{
        const data = await stores.find({})
        
        res.status(200).send(data)
    }catch(e){
        res.status(404).send(e)
    }
})

router.get('/stores/product_list/:id',async(req,res)=>{
    try{
        const store =  await stores.findById(req.params.id)
       
        const productList =  await store.populate('product').execPopulate()
         
        // console.log(productList.product)
        res.status(200).send(productList.product)
       
    
        }catch(e){
            console.log(e)
        }
})

router.get('/store/me',auth,async(req,res)=>{
    res.send(req.store)
})

router.get('/store_by_name/:name',async(req,res)=>{
    try{
        const name = req.params.name
        const store =await stores.find({businessName:name})
        res.status(200).send(store)
    }catch(e){

    }
})

router.post('/store/login',async(req,res)=>{
    try{
        // const userDetails = req.body.req.body
        const store = await stores.findByCredentials(req.body.email,req.body.password)
        const token = await store.generateAuthToken()
        res.status(200).send({store,token})
        
        // console.log(req.body.userDetails)
    }catch(e){
        res.status(400).send(e)
    }

    // console.log(req.body.email)
})


router.post('/store/logout',auth,async(req,res)=>{
    try{
        req.store.tokens = req.store.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.store.save()

        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.post('/store/logout_all',auth,async(req,res)=>{
    try{
        req.store.tokens = []
        await req.store.save()
        res.send()
        }catch(e){
        res.status(500).send()
    }
    
})

module.exports = router