const express = require('express')
const cors = require('cors')
const {mongoose} = require('./Config/database') // mongoose without {} if single value is passed
const app = express()

const { usersRouter } = require('./app/Controller/userController') 

//for heroku 
const path = require("path")
const port = process.env.PORT || 3005

app.use(express.json())
app.use(cors())

app.use('/users',usersRouter)

app.use(express.static(path.join(__dirname,"client/build")))

app.get("*", (req,res) =>{
    res.sendFile(path.join(__dirname + "/client/build/index.html"))
})


app.listen(port ,() =>{
    console.log('Listening on port', port)
})
