const express = require('express')
const path = require('path')
const multer = require('multer')
const connection = require('./dbconnection')
const app = express()


//define caminho para a pasta pública do projeto
app.use(express.static('./public'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: false }))

//define as rotas possíveis 
app.use('/navbar',require('./routes/navbarRoute'))
app.use('/formdata',require('./routes/formdataRoute'))
//app.use('/utilizador',require('./routes/inserirutilizadorRoute'))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

let filename

const storage = multer.diskStorage({
    //define onde e com que nome a imagem é guardada
    destination: (req,file,callback)=>{
        callback(null, './public/uploads')
    },
    filename: (req,file,callback)=>{
        filename = Date.now() + '--' + file.originalname
        callback(null, filename)
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000}
}).single('image')

app.post('/utilizador', (req,res) => {
    upload(req, res, (err)=>{
        console.log(req.file.filename)
        console.log(path.extname(req.file.filename))
        connection.query(
            'INSERT INTO utilizadores (nomeutilizador,moradarua,moradanumero,datanascimento,telemovel,email,idtipo,fotourl) VALUES (?,?,?,?,?,?,?,?)', 
            [req.body.nomeutilizador,req.body.moradarua, req.body.moradanumero,req.body.datanascimento,req.body.telemovel,req.body.email,req.body.idtipo,filename],     
            (err,result) => {
            if(err){
                console.log(err)
            }
            else {
                console.log('Novo ID: ' + result.insertId)
                res.json({res : 'Utilizador adicionado com sucesso!'})
            }
        })
        if(err){
            res.json({res: err})
        } else {
            if(req.file == undefined){
              res.json({res:'No file selected'})
            }
            else{               
                
            }           
        }
    })  
});

const port = 5000 
 
app.listen(port, () => {
    console.log(`Listenning on port ${port}`)
})