const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

/*----------- Models Start -----------*/
const { Product } = require('./models/product');

/*----------- Models End -----------*/

/*----------- Middelware Start -----------*/
//const { auth } = require('./middleware/auth');
/*----------- Middelware End -----------*/

app.use(bodyParser.json());
app.use(cookieParser());

/*============ Image upload Start ===========*/

/*----------- Multer -----------*/

//add static public folder 
app.use(express.static('client/public'));

const multer = require('multer');
const storage = multer.diskStorage({
    destination : function( req , file , cb ){
        cb(null,'client/public/images');
    },
    filename: function( req , file , cb ){
        cb(null,new Date().toISOString() + file.originalname);
    }
})
const uploadImage = multer({storage : storage})

/*============ Image upload End ===========*/

/*============================== Product Related Apis Start ===================================*/

/*------------- GET ------------------*/

//GET METHOD : "/api/getProducts" : get all products detailes from database 

app.get("/api/getProducts",(req,res)=>{
//http://localhost:3001/api/getProducts?skip=3&limit=2&order=asc
const skip = parseInt(req.query.skip);
const limit = parseInt(req.query.limit);
const order = req.query.order;

Product.find().skip(skip).sort({_id : order}).limit(limit).exec((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc)
    })
})

/*------------- POST ------------------*/

//POST METHOD : "/api/product" store details of product in database 

app.post("/api/product",uploadImage.single('productImage'),(req,res)=>{
   
    console.log(req.body);
    console.log(req.file);


    const product = new Product(req.body);

    product.productImage = req.file.filename;

    product.save((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post : true,
            productId : doc._id,
            productImage : doc.productImage
        })
    })

})

/*------------- UPDATE ------------------*/
//Post Method for update 

/*------------- DELETE ------------------*/
//delete method for delete 

/*============================== Product Related Apis end =======================================*/

//code for production environment 
if(process.env.NODE_ENV === 'production'){
    const path  =  require('path');
    app.get('/*',(req,res)=>{
        res.sendfile(path.resolve(__dirname,'../client','build','index.html'))
    })
}

const port = process.env.PORT || 3001;

app.listen(port,()=>{
    console.log('SERVER RUNNING.')
})


