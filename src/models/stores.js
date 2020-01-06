const mongoose  = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const storeSchema = new mongoose.Schema({
    businessName:{
        type:String,
        required:true
    },
    GSTIN:{
        type:String
        // required:true
    },
    email:{
        type: String,
        unique:true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    url:{
        type:String,
        unique:true
    },
    mobileNo:{
        type:Number
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    ConfirmPassword: {
        type: String,
        // minlength: 7,
        // trim: true,
    },
    aLine1:{
        type:String,
        // required:true
    },
    aLine2:{
        type:String
    },
    shopCircle:{
        type:String,
        // required:true
    },
    lat:{
        type:String
    },
    long:{
        type:String
    },
    city:{
        type:String,
        // required:true
    },
    state:{
        type:String 
    },
    pincode:{
        type:Number
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

storeSchema.virtual('product',{
    ref:'product',
    localField:'_id',
    foreignField:'vendor'
})

storeSchema.methods.toJSON = function(){
    const store  = this
    const storeObject = store.toObject()

    delete storeObject.password
    delete storeObject.tokens

    return storeObject
}

storeSchema.methods.generateAuthToken = async function () {
    const store = this 
    const token = jwt.sign({_id:store._id.toString()},'hastalavista')
    store.tokens = store.tokens.concat({token})
    await store.save()
    return token
}

storeSchema.statics.findByCredentials = async (email,password)=>{
    const store = await stores.findOne({email})

    if(!store){
        throw new Error ('unable to login')
    }
    const isMatch = await bcrypt.compare(password,store.password)

    if(!isMatch){
        throw new Error ('unable to login')
    }

    return store

}


storeSchema.pre('save', async function(next){
    const store= this 
    if (store.isModified('password')){
        store.password = await bcrypt.hash(store.password,8)
    }

    next()
})


const stores = mongoose.model('storeDetails',storeSchema)

module.exports = stores