const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://prakersh:prakersh2000@clusterprakersh.eyt5r.mongodb.net/AryaContact?retryWrites=true&w=majority",{useCreateIndex:true, useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("connection is successfully established")
})
.catch((e)=>console.log(e));

module.exports.Record=require("./sch")
