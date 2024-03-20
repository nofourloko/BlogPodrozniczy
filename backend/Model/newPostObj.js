const path = require('path')
const {placeDescriptionTextFile} = require('../Controler/FileLoader')
const crypto = require('crypto')

async function newPostObjContructor(Place, Country, Continent, date, textFile, images, description){
    const localDateTime = new Date(date).toLocaleDateString('pl-PL', {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    
    const textFileData = await placeDescriptionTextFile(path.join(__dirname , "../" ,textFile[0].path))
    const imagesList = images.map(file => { return `http://localhost:5000/${file.path}`})
    let image = imagesList[0]

    imagesList.shift()

    const newPostObj = {
        Place : Place,
        Country : Country,
        Continent : Continent,
        Date : localDateTime,
        Comments : [],
        Image : image,
        ImagesList: imagesList,
        TextFile: textFileData,
        Description: description,
        id: crypto.randomBytes(10).toString('hex').toUpperCase()
    }

    return newPostObj
}

module.exports = {newPostObjContructor}