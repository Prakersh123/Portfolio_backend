require('dotenv').config();
const express= require("express");
const cors = require('cors')
var cloudinary = require('cloudinary')
const data = require("./db")
const nodemailer = require('nodemailer')
const bodyParser       = require('body-parser')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const app = express();
const port = process.env.PORT || 8000
app.use(cors());




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

cloudinary.config({ 
    cloud_name: "dy6nqdi1h", 
    api_key: "644311913439678", 
    api_secret: "wSCQSqJQutrXOjq9ye8W89YfTpQ"
});

app.post('/',async (req,res)=>{
    






    const new_document = await new data.Record({
        Name:req.body.Name,
        Email:req.body.Email,
        Message:req.body.Message
        
    }) 
    const result = await new_document.save();
    res.send("Thank you")
})

const upload_get_url = (image) => {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(image , (err, url) => {
        if (err) return reject(err);
        return resolve(url);
      });
    });
}

app.post("/upload",upload.single('file_url'),async (req,res)=>{
    try{
        const FILE= req.file;
        const {public_id, secure_url} = await upload_get_url(FILE.path);
    console.log('cloudata', secure_url, public_id);
            if(req.body.type=="circulars")
            {
                const result = await data.Notify.findOne({});
                if(result==null)
                {
                     const resul  = await new data.Notify({
                    circular:[{file_url:secure_url,
                        public_id,
                        title:req.body.title
                    }]
                });

                // console.log(result)
                // result.circular.push();
                const ress=  await resul.save();
                console.log(ress);
                    return res.json(ress);
                }
                    else
                    {
                        result.circular.push({
                            
                                file_url:secure_url,
                                    public_id,
                                    title:req.body.title
                        })
                        const final_one= await result.save();
                        console.log("printing from not null",result);
                    return res.json(result);

                    }

                          }      
                          else
                          {

                            const result = await data.Notify.findOne({});
                            if(result==null)
                            {
                                 const resul  = await new data.Notify({
                                news:[{file_url:secure_url,
                                    public_id,
                                    title:req.body.title
                                }]
                            });
            
                            // console.log(result)
                            // result.circular.push();
                            const ress=  await resul.save();
                            console.log(ress);
                    return res.json(ress);
                            
                            }
                                else
                                {
                                    result.news.push({
                                        
                                            file_url:secure_url,
                                                public_id,
                                                title:req.body.title
                                                   
                                    })
                                    const final_one= await result.save();
                                    console.log("printing from not null",result);
                                    return res.json(result);
            
                                }
            
        
        
                        }      
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:"not uploaded"})
    }
    


})



app.get("/getallevent" , async(req,res)=>{

    const result = await data.Notify.findOne({});
    return res.json(result);
})      

app.listen(port,()=>{
    console.log("listening")
})

