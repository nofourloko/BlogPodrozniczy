const fs = require('fs/promises')
var path = require('path');


async function loadFile(fileName){
    try{
        const filePath = path.join(__dirname, `../uploads/${fileName}`)
        const data = await fs.readFile(filePath)

        return data
    }catch(err){
        console.log(err)
        return err
    }
}

async function placeDescriptionTextFile(path){
    try{
        let textFileArray = []
        let index= 0 
        let tmp = ""

        const data = (await fs.readFile(path, 'utf-8')).toString()
        data.split(/\r?\n/).forEach(line =>  {
            if(index === 5){
                textFileArray.push(tmp)
                tmp = ""
                index = 0
            }

            tmp += index === 0 ? line : ` ${line}`
            index += 1

            if( data.split(/\r?\n/).indexOf(line) == data.split(/\r?\n/).length - 1 ){
                textFileArray.push(tmp)
            }

          });

          return textFileArray
    }catch(err){
        console.log(err)
        throw new Error("Blad odczytu pliku: " + err)
    }
}

module.exports = {loadFile, placeDescriptionTextFile}