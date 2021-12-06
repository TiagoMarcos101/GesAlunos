
function init(){
getNavbar();
getTipos();

let btn = document.getElementById('btn')
btn.addEventListener('click', function(){
cpData();
}

)}

function getNavbar(){
    const nbar = document.getElementById('nbar')
    fetch('http://localhost:3000/navbar')
    .then(res => res.text())
    .then((html)=>[
        nbar.innerHTML += html
    ])
    .catch(function(err){
        alert('Ocorreu um problema...')
    })
}








/*funções antigas, podem dar jeito :)*/
function getData(){
    fetch('http://localhost:5000/bd')
    .then(res => res.json())
    .then(data => processData(data))
    .catch(function(err){
        alert('Ocorreu um problema...')
    })
}
function processData(data) {
    const linhaCidade = document.getElementById('cidades')
    linhaCidade.innerHTML=''
    for(let i=0 ; i < 100; i++){
        let nome = data[i].Name
        let distrito = data[i].District
        let pop = data[i].Population
        let ID = data[i].ID
        linhaCidade.innerHTML += `<tr>
                                    <td>${nome}</td>
                                    <td>${distrito}</td>
                                    <td>${pop}</td>
                                    <td>
                                    <button
                                        onclick="showID(${ID});"
                                        type="button" 
                                        class="btn btn-success"
                                        style="width:100px;"> Editar                                      
                                    </button>
                                    <button 
                                        type="button" 
                                        class="btn btn-danger"
                                        style="width:100px;"> Eliminar
                                    </button>
                                    </td>
                                </tr>`
    }
}
function showID(ID){
    console.log(ID)
}
function getTipos()
{

    const tipos = document.getElementById('tipo')
    fetch('http://localhost:3000/formdata')
    .then(res => res.json())
    .then(data => {
     for(let i=0;i<data.length;i++)
     {
         const op = `<option value"${data[i].idtipo}">${data[i].designacao}</option>`
         tipos.innerHTML += op
     }
    })
    .catch(function (err){
        alert('err')
    })
}
function cpData()
{
    let nomeAluno = document.getElementById('nome').value
    if(nomeAluno == '')
    {
        alert("mete algo")
    }else
    {
    console.log("Nome completo:     " + nomeAluno)
}
let morada = document.getElementById('morada_rua').value
    if(morada == '')
    {
        alert("mete algo")
    }else
    {
    console.log("Morada:    "+morada)
}
let nummorada = document.getElementById('morada_num').value
    if(morada == '')
    {
        alert("mete algo")
    }else
    {
    console.log("Numero da Morada:    "+nummorada)
}

}
