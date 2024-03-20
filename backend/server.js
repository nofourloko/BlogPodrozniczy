const express = require("express")
const adminRouter = require('./Routes/admin.js')
const postsRouter = require('./Routes/posts.js')
const fileManagerRouter = require('./Routes/fileManager.js')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json());

app.use('/uploads', express.static('./uploads'))


//Route for admin related actions (login, adding post)
app.use("/api/admin", adminRouter)

//Route for serving posts from database
app.use("/relacje", postsRouter)

//Route for serving files stored on the server
app.use('/file', fileManagerRouter)



app.listen(port, (err) => {
    if(err){
        throw new Error("Błąd połączenia z serwerem")
    }
    console.log(`Server is running on port : ${port}`)
})
