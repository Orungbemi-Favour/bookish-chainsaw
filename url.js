const express = require('express')
const path = require("path");
const fs = require('fs/promises');
const app = express();
const port = 5000;
const generateUrl = require('./Middlewares/generateUrl');
const { readFile } = require('fs');
app.use(express.static(path.resolve('Public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/',async(req,res)=>{
    const filepath = path.resolve('index.html');
    res.sendFile(filepath);
})
app.get('/:slug',async(req,res)=>{ 
    let links;
    try {
        links = await fs.readFile('data.json','utf-8');
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
        data = await fs.readFile(path.resolve('data.json'), 'utf-8')
        data = JSON.parse(data)
    } catch (error) {
        data = []
    }
    console.log(data);
    let newURL= {
        originalURL: req.body.text,
        slug: req.slug,
        shortURL: `http://localhost:${port}/${req.slug}`,
    }
    data.push(newURL);
    await fs.writeFile(path.resolve('data.json'),JSON.stringify(data),'utf-8')
    console.log(data);
    res.status(200).json(newURL)
})


app.listen(port,(err)=>{
    console.log(`Server runnig on http://localhost:${port}`);
})