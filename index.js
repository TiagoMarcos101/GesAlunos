const express = require('express')
const path = require('path')
const app = express()
const connection = require('./dbconnection')
app.use(express.static('./public'))

app.use('/navbar',require('./rotas/navbarRoute.js'))
app.use('/formdata',require('./rotas/formdataRoute.js'))





app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/navbar',(req,res)=>{
    res.sendFile(path.join(__dirname, './public/navbar.html'))
})


const port = 3000
 
app.listen(port, () => {
    console.log(`Listenning on port ${port}`)
})