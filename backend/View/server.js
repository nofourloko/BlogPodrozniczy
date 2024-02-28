const express = require("express")
const { getBlogEntries, getSelectedBlogEntry, UpdateComments} = require("../Controler/DbConnectionControler.js")
const { LoadFile } = require("../Controler/FileLoader.js")
const app = express()
const port = 5000

app.use(express.static("Static"))

app.use("*", (req,res,next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next()
})


app.get("/info", async (req,res) => {
    try{
        const data = await LoadFile('opis.txt')
        res.json(data)
    }catch(err){
        res.send(`Wystapil blad polaczenia ${err}` )
    }
   
})

app.get("/relacje/info", async (req, res) => {
    try{
        const data = await getBlogEntries()
        res.json(data)
    }catch(err){
        res.status(501).json(`Wystapil blad polaczenia ${err}`)
    }
})

app.get("/relacje/selectedPlaceInfo", async (req, res) => {
    try{
        const { place } = req.query
        const data = await getSelectedBlogEntry(place)
        res.json(data)
    }catch(err){
        res.status(501).json(`Wystapil blad polaczenia ${err}`)
    }
})

app.post("/relacje/selectedPlaceInfo/Comment",async (req,res) => {
    try{
       const {com, docId} = req.query
       await UpdateComments(docId, com)
    }catch(err){
        res.status(501).json(`Wystapil blad polaczenia ${err}`)
    }
})

app.listen(port, (err) => {
    if(err){
        throw new Error("Błąd połączenia z serwerem")
    }

    console.log(`Server is running on port : ${port}`)
})
