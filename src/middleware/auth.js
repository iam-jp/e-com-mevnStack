const jwt = require('jsonwebtoken')
const stores = require('./../models/stores')

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



module.exports=auth