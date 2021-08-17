require('dotenv').config();
const express= require("express");
const data = require("./db")

const bodyParser       = require('body-parser')

const app = express();
const port = process.env.PORT || 8000


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.post('/',async (req,res)=>{
    

    const new_document = await new data.Record({
        Name:req.body.Name,
        Email:req.body.Email,
        Message:req.body.Message
        
    }) 
    const result = await new_document.save();
    res.send("Thank you")
})

app.listen(port,()=>{
    console.log("listening")
})

