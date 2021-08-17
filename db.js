const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASEURL,{useCreateIndex:true, useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("connection is successfully established")
})
.catch((e)=>console.log(e));

module.exports.Record=require("./sch")
