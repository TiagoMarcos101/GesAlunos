const express = require('express')
const multer = require('multer')
const inserirutilizadorRoute = express.Router()
const connection = require('../dbconnection')

const storage = multer.diskStorage({
    //define onde e com que nome a imagem é guardada
    destination: (req,file,callback)=>{
        callback(null, '../public/uploads')
    },
    filename: (req,file,callback)=>{
        callback(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000}
}).single('image')

inserirutilizadorRoute.post('/', (req,res) => {
    upload(req, res, (err)=>{
        console.log(req.body)
        if(err){
            res.json({res: err})
        } else {
            if(req.file == undefined){
              res.json({res:'No file selected'})
            }
            else{
                console.log(req.file)
                res.json({res:'Sucesso!'})
            }           
        }
    }) 
    /*connection.query(
        'INSERT INTO utilizadores (nomeutilizador,moradarua,moradanumero,datanascimento,telemovel,email,idtipo) VALUES (?,?,?,?,?,?,?)', 
        [req.body.nomeutilizador,req.body.moradarua, req.body.moradanumero,req.body.datanascimento,req.body.telemovel,req.body.email,req.body.idtipo],     
        (err,result) => {
        if(err){
            console.log('Erro na base de dados...')
        }
        else {
            console.log(result)
            res.json({text : 'Utilizador adicionado com sucesso!'})
        }
    })*/
    
})

module.exports = inserirutilizadorRoute
