const mongoose = require('mongoose');

const productSchema = mongoose.Schema({ 
    name : {
        type : String,
        required : true
    },
    review : {
        type: String,
        default:"n/a"
    },
    rating : {
        type: Number,
        required : true,
        min : 1,
        max : 5
    },
    price : {
        type: String,
        default:"n/a"
    },
    productImage : {
        type: String,
        required : true
    }
},{timestamps:true})

const Product = mongoose.model("Product",productSchema);

module.exports = { Product }