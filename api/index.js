const express = require('express')
const path = require("path");
const fs = require('fs/promises');
const app = express();
const generateUrl = require('../Middlewares/generateUrl');
app.use(express.static(path.join('__dirname,../Public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/',async(req,res)=>{
    const filepath = path.join('__dirname,../index.html');
    res.sendFile(filepath);
})
app.get('/:slug',async(req,res)=>{ 
    let links;
    try {
        links = await fs.readFile('../data.json','utf-8');
        links = JSON.parse(links);
    } catch (error) {
        links = [];
    }
    let match = links.find((link)=>{
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
    let data;
    try {
        data = await fs.readFile(path.join('__dirname../data.json'), 'utf-8')
        data = JSON.parse(data)
    } catch (error) {
        data = []
    }
    console.log(data);
    let newURL= {
        originalURL: req.body.text,
        slug: req.slug,
        shortURL: `${req.protocol}://${req.get('host')}/${req.slug}`,
    }
    data.push(newURL);
    await fs.writeFile(path.join("__dirname../data.json"),JSON.stringify(data),'utf-8')
    console.log(data);
    res.status(200).json(newURL)
})
mosule.exports = app;
