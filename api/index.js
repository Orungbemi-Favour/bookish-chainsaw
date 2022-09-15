const express = require('express')
const path = require("path");
const fs = require('fs/promises');
const app = express();
const generateUrl = require('../Middlewares/generateUrl');
app.use(express.static(path.join(__dirname, '../Public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
let data = []
app.get('/',(req,res)=>{
    const filepath = path.join(__dirname,"..","/index.html");
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
    console.log(req.body);
    console.log(req.slug);
    console.log(data);
    let newURL= {
        originalURL: req.body.text,
        slug: req.slug,
        shortURL: `${req.protocol}://${req.get('host')}/${req.slug}`,
    }
    data.push(newURL);
    console.log(data);
    res.status(200).json(newURL)
})
module.exports = app;
