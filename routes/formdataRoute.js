const express = require('express')
const formdataRoute = express.Router()
const connection = require('../dbconnection')

formdataRoute.get('/', (req,res) => {
    connection.query('SELECT * FROM tipos', (err,result) => {
        if(err){
            console.log('Erro na base de dados...')
        }
        else {
            res.json(result)
        }
    }) 
})

module.exports = formdataRoute

