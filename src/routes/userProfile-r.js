const express = require('express')
const userProfile = require ('./../models/userProfile')
const auth = require('./../middleware/auth')
const userAuth = auth.userAuth
const router = new express.Router()

router.post('/user/sign_in',async(req,res)=>{
    const data = req.body
   
    const user = new userProfile(data)

    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(200).send({user,token})
        console.log({user,token})
    }
    catch(e){
        res.status(400).send(e)
    }

    // res.status(200).send('test sucsess')
})

router.post('/user/login',async(req,res)=>{
    try{
        const user = await userProfile.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/user/me',userAuth,async(req,res)=>{
    try{
        res.send(req.user)
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
    

})

router.patch('/user/to_cart',userAuth,async(req,res)=>{
   try{
    const user = await userProfile.findById(req.user._id) 
    
    user.cart = user.cart.concat(req.body)

    await user.save()

    res.status(200).send(user.cart)
   }catch(e){
       console.log(e)
       res.status(400).send(e)
   }
})



router.post('/user/logout_all',userAuth,async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
        }catch(e){
        res.status(500).send(e)
    }
    
})

module.exports = router