const express = require('express')
const postsRouter = express.Router()
const {
    getCountriesList,
    UpdateComments, 
    getEntry
} = require('../Controler/DbConnectionControler')

postsRouter.get("/info", async (req, res) => {
    try{
        const data = await getEntry()
        res.json(data)
    }catch(err){
        res.status(501).json(`Wystapil blad polaczenia ${err}`)
    }
})

postsRouter.get("/info/:country", async (req, res) => {
        try{
          const {country} = req.params
          const data = await getEntry('Country', country.toString())
          res.json(data)  
        }catch(err){
            res.status(501).json(`Wystapil blad : ${err}`)
        }
        
    })

postsRouter.get("/countriesList", async (req,res) => {
    try{
        const data = await getCountriesList()
        res.json(data)
    }catch(err){
        res.status(501).json(`Wystapil blad polaczenia ${err}`)
    }
})

postsRouter.get("/selectedPlaceInfo", async (req, res) => {
    try{
        const { place } = req.query
        const data = await getEntry('Place', place)
        res.json(data)
    }catch(err){
        res.status(501).json(`Wystapil blad polaczenia ${err}`)
    }
})

postsRouter.post("/selectedPlaceInfo/Comment",async (req,res) => {
    try{
       const {com, docId} = req.query
       await UpdateComments(docId, com)
    }catch(err){
        res.status(501).json(`Wystapil blad polaczenia ${err}`)
    }
})

module.exports = postsRouter