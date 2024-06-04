const express = require('express')
require('dotenv').config()
const dbConnect = require('./Config/dbconnect')
const initRoutes = require('./Routes')

const app = express()
const port = process.env.PORT || 8888
app.use(express.json()) // read dta
app.use(express.urlencoded({extended : true}))  // read data

dbConnect()
initRoutes(app)

app.use('/' , (req , res) => {res.send('SERVER ONNNN')})
app.listen(port, ()=> {
    console.log('SERVER RUNNING ON THE ' + port) ;
})