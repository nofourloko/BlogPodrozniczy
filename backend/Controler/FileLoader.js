const fs = require('fs/promises')
var path = require('path');


async function LoadFile(fileName){
    try{
        const filePath = path.join(__dirname, `../Static/${fileName}`)
        const data = await fs.readFile(filePath)

        return data.toString()
    }catch(err){
        console.log(err)
        return err
    }
}

module.exports = {LoadFile}