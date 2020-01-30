require('./db/mongoose')
const express = require('express')
const cors = require ('cors')
const history = require('connect-history-api-fallback')
const bannerUploadRouter = require('./routes/bannerUpload-r') 
const storeRouter = require('./routes/stores-r')
const productRouter = require('./routes/products-r')
const gcRouter = require('./routes/gcupload-r')
const locationRouter = require ('./routes/location-r')
const onlineStoresRouter = require('./routes/onlineStores-r')
const onlineProductsRouter = require('./routes/onlineProducts-r')
const userProfileRouter = require('./routes/userProfile-r')
const http = require ('http')


const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
// app.use(express.static('./../../adminpanel'))
app.use(bannerUploadRouter)
app.use(storeRouter)
app.use(productRouter)
app.use(gcRouter)
app.use(locationRouter)
app.use(onlineStoresRouter)
app.use(onlineProductsRouter)
app.use(userProfileRouter)
app.use(history)


app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "default-src *");
    return next();
});







app.listen(port,()=>{
    console.log('server started on port ' + port)
})


