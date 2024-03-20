const express = require('express')
const {getEntry, addNewPost} = require('../Controler/DbConnectionControler')
const adminRouter = express.Router()
const jwt = require('jsonwebtoken')
const multer  = require('multer')
const {newPostObjContructor} = require('../Model/newPostObj')
require('dotenv').config()


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
      },
    filename : function(req, file, cb){
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({storage : storage});

adminRouter.get('/login', async (req, res) => {
    const {login , password} = req.query
    const adminData = await getEntry('username', login, 'admin')
    console.log(login, password)

    if(adminData.length === 0, adminData.length === 0){
        res.status(403).json({status: 'failed'})
        return
    }

    if(adminData[0].password !== password){
        res.status(403).json({status: 'failed'})
        return
    }

    const adminObj = {
        login : adminData[0].username,
        password : adminData[0].password,
    }


    const jwtToken = jwt.sign(adminObj, process.env.JWT_SECRET , { expiresIn : '24h'})

    res.json({msg : 'Witaj !', token : jwtToken, username : adminObj.login})
})


adminRouter.post('/addPost',
    upload.fields(
        [
            {name : 'images', maxCount: 7},
            {name : 'textFile', maxCount: 1}
        ]
    ), 
    async (req, res) => {
        const { Place, Country, Continent, Date, Description } = req.body
        const { textFile, images } = req.files
        try {
            const newPostObj = await newPostObjContructor(Place, Country, Continent, Date,textFile, images, Description)
            const addingResponse = await addNewPost(newPostObj)
            res.json(addingResponse)
        } catch (error) {
            res.status(501).json(`Wystapil blad dodawania posta ${err}`)
        }
       
    }
)

module.exports = adminRouter