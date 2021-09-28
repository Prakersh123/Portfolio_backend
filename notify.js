const mongoose = require("mongoose")
const newsandeventschema = new mongoose.Schema({
    

    circular:[{
        title:String,
        file_url:String,
        public_id:String
    }],
    news:[{
        title:String,
        file_url:String,
        public_id:String
    }],
    date:{
        type:String,
        default:Date.now
    }
})

 module.exports = new  mongoose.model('Notify',newsandeventschema);

