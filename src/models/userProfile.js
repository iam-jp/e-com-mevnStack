const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userProfileSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('Email is invalid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Pasword cannot contain password')
            }
        }
    },
    Address:[{
        saved:{
            type:String
        }
    }],
    purchaseHistory:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'product'
        },
        onlineProductId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'onlineProduct'
        }
    }],
    wishlist:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'product'
        },
        onlineProductId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'onlineProduct'
        }
    }],
    cart:[{
        
    }],
    tokens:[{
        token:{
            required:true,
            type:String
        }
    }]
})

userProfileSchema.methods.toJSON=function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
     
    return userObject
}

userProfileSchema.methods.generateAuthToken=async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'yippee-ki-yay')

    user.tokens = user.tokens.concat({token})

    await user.save()

    return token
}

userProfileSchema.statics.findByCredentials=async(email,password)=>{
    const user = await userProfile.findOne({email})
    if(!user){
        throw new Error('unable to login')
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new  Error ('unable to login')
    }

    return user
}

userProfileSchema.pre('save', async function(next){
    const user =this 
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})



const userProfile = mongoose.model('userProfile',userProfileSchema)

module.exports = userProfile