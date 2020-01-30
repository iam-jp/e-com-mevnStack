const express = require('express')
const stores = require('./../models/stores')
const auth = require('./../middleware/auth')
const storeAuth =auth.auth
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

router.get('/stores/:category',async(req,res)=>{
    try{
        const category = req.params.category
        const store = await stores.find({shopCategory:category})
        res.status(200).send(store)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/stores/master_delete',async(req,res)=>{
    try{
        // const name = req.params.name
        await stores.deleteMany({})
       
        res.status(200)
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

router.get('/stores/product_list/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const store =  await stores.findById(id)
       
        const productList =  await store.populate('product').execPopulate()
         
        
        res.status(200).send(productList.product)
        
       
    
        }catch(e){
            console.log(e)
        }
})

router.get('/store_by_name/product_list/:name',async(req,res)=>{
    try{
        const name = req.params.name
        const store = await stores.find({businessName:name})
        const storebyId =  await stores.findById(store[0]._id)
       
        const productList =  await storebyId.populate('product').execPopulate()
         
        
        res.status(200).send(productList.product)
    }catch(e){
        console.log(e)
    }
})

router.get('/store/me',storeAuth,async(req,res)=>{
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

router.get('/store_by_url/:name',async(req,res)=>{
    try{
        const name = req.params.name
        const store =await stores.find({url:name})
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


router.post('/store/logout',storeAuth,async(req,res)=>{
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

router.post('/store/logout_all',storeAuth,async(req,res)=>{
    try{
        req.store.tokens = []
        await req.store.save()
        res.send()
        }catch(e){
        res.status(500).send()
    }
    
})

module.exports = router