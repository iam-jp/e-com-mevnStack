const jwt = require('jsonwebtoken')
const stores = require('./../models/stores')
const userProfile = require ('./../models/userProfile')

const auth = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        
        const decode = jwt.verify(token,'hastalavista')
        
        const store = await stores.findOne({_id:decode._id,'tokens.token':token})
        if(!store){
            throw new Error()
        }
        
        // req.header = header
        req.token = token
        req.store = store
        
        
        next()
    }catch(e){
        res.status(401).send({error:'Please authenticate'})
    }
}


const userAuth = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        // console.log(token)

        const decoded = jwt.verify(token,'yippee-ki-yay')
       

        const user = await userProfile.findOne({_id:decoded._id,'tokens.token':token})

        if(!user){
            throw new Error ()
        }

       
        req.user = user
        req.token=token

        next()

    }
    catch(e){
        res.status(400).send({error:'please Authenticate'})
    }

    
}


module.exports={
    auth,
    userAuth
}
