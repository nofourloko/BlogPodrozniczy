const express = require('express')
const { loadFile } = require("../Controler/FileLoader.js")
const fileManagerRouter = express.Router()

fileManagerRouter.get("/downloadPDF", async (req, res) => { 
    try{
        let fileBuffer = await loadFile('PolitykaPrywatnosci.pdf');
        res.send(fileBuffer)
    }catch(err){
        console.log(err)
        res.status(501).json(`Wystapil blad polaczenia ${err}`)
    }
    
}); 

fileManagerRouter.get("/info", async (req,res) => {
    try{
        const data = await loadFile('opis.txt')
        res.json(data.toString())
    }catch(err){
        res.send(`Wystapil blad polaczenia ${err}` )
    }
   
})

module.exports = fileManagerRouter