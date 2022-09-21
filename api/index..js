const express = require('express')
const path = require("path");
const app = express();
const generateUrl = require('../Middlewares/generateUrl');
app.use(express.json())
app.use(express.urlencoded({extended:true}))

let data = [];

app.get('/',async(req,res)=>{
    const filepath = path.join(__dirname, "../index.html")
    res.sendFile(filepath);
})
app.get('/:slug',async(req,res)=>{ 
   
    let match = data.find((link)=>{
        return link?.slug === req.params.slug;
    })
    if(!match){
       return res.status(404).send()
    }
    res.redirect(match.originalURL);
})
app.post('/submit',generateUrl,async(req,res)=>{

    let newURL= {
        originalURL: req.body.text,
        slug: req.slug,
        shortURL: `http://localhost:${port}/${req.slug}`,
    }
    data.push(newURL);
    res.status(200).json(newURL)
})

module.exports = app;