const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
    name:{
        type: String
    },
    quantity:{
        type: Number
    },
    price:{
        type:Number
    },
    status:{
        type:Number
    },
    image:{
        type: Array
    },
    description:{
        type:String,
    },
    id_distributor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'distributor'
    }
})
const FruitModel = mongoose.model("Fruit",fruitSchema);
module.exports = FruitModel;