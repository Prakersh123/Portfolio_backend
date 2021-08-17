const mongoose = require("mongoose")
const recordSchema = new mongoose.Schema({
    Name:String,
    Email:String,
    Message:String,
    date:{
        type:String,
        default:Date.now
    }
})

 module.exports = new  mongoose.model('Record',recordSchema);

