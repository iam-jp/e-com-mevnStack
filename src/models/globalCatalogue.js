const mongoose = require('mongoose')

const gcSchema = new mongoose.Schema({
    storeName:{
        type:String
    },
    asin:{
        type:String
    },
    pasin:{
        type:String
    },
    sku:{
        type:String
    },
    title:{
        type:String
    },
    shortDescription:{
        type:String
    },
    longDescription:{
        type:String
    },
    category:{
        type:String
    },
    subCategory2:{
        type:String
    },
    subcategory3:{
        type:String
    },
    subcategory4:{
        type:String
    },
    price:{
        type:Number
    },
    salePrice:{
        type:Number
    },
    simpleProduct:{
        type:Boolean
    },
    variableProduct:{
        type:Boolean
    },
    variationType:{
        type:String
    },
    parentVariation:{
        type:String
    },
    variationName:{
        type:String
    },
    variationSize:{
        type:String
    },
    variationColor:{
        type:String
    },
    variationImages:{
        type:String
    },
    attributeSize:{
        type:String
    },
    attributeColor:{
        type:String
    },
    baseImage:{
        type:String
    },
    additionalImage:{
        type:String
    },
    productVideo:{
        type:String
    },
    quantity:{
        type:Number
    },
    netWeight:{
        type:String
    },
    grossWeight:{
        type:String
    },
    width:{
        type:String
    },
    height:{
        type:String
    },
    length:{
        type:String
    },
    taxPercentage:{
        type:String
    },
    countryOfOrigin:{
        type:String
    },
    manufacturerName:{
        type:String
    },
    brandName:{
        type:String
    },
    giftPack:{
        type:Boolean
    },
    searchKeyword:{
        type:String
    },
    metaTitle:{
        type:String
    },
    metaDescription:{
        type:String
    },
    shippingCharges:{
        type:Number
    },
    packingCharges:{
        type:Number
    }
})

gcSchema.methods.toJSON = function(){
    const gc = this
    gcObject = gc.toObject()

    delete gcObject._id
    return gcObject
}

const gcModel = mongoose.model('globalCatalogue',gcSchema)


module.exports = gcModel