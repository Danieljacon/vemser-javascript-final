const url = "http://localhost:3000";

class Usuario {

    constructor(tipo, nome, dataNascimento, email, senha) {
        this.id
        this.tipo = tipo;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.email = email;
        this.senha = senha;
        this.candidaturas = []; // lista de Candidaturas
    }
}

class Candidatura {

    constructor(idVaga, idCandidato){
        this.idVaga = idVaga;
        this.idCandidato = idCandidato;
        this.reprovado = false; // booleano
    }
}

class Vaga {
    constructor(titulo, descricao, remuneracao){
        //id; //(automático json-server)
        this.titulo = titulo;
        this.descricao = descricao;
        this.remuneracao = remuneracao;
        this.candidatos = []; // lista de candidatos na vaga
    }
}

async function postVaga(){
    const response = await fetch(`${url}/vaga`);
    const post = await response.json();

    let titulo = document.getElementById('').value;
    let descricao = document.getElementById('').value;
    let remuneracao = document.getElementById('').value;
    let candidatos = document.getElementById('').value;


    var vaga = new Vaga(titulo, descricao, remuneracao, candidatos);

    await fetch(`${url}/vaga`, {
        method: 'POST',
        body: JSON.stringify({
            titulo: vaga.titulo,
            descricao: vaga.descricao,
            remuneracao: vaga.remuneracao,
            candidatos: vaga.candidatos
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then(response => response.json())
    .then(json => console.log(json))
}

async function postCandidatura(){
    const response = await fetch(`${url}/candidatura`);
    const post = await response.json();

    let idVaga = document.getElementById('').value;
    let isCandidato = document.getElementById('').value;
    let status = document.getElementById('').value;

    var candidato = new Candidatura(idVaga, idCandidato, status);

    await fetch(`${url}/candidatura`, {
        method: 'POST',
        body: JSON.stringify({
            idVaga: candidato.idVaga,
            idCandidato: candidato.idCandidato,
            reprovado: candidato.reprovado
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then(response => response.json())
    .then(json => console.log(json))
}

async function postUser(){
    const response = await fetch(`${url}/usuario`);
    const post = await response.json();

    let tipo = document.getElementById('input-signup-type');
    let tipoSelected = tipo.options[tipo.selectedIndex].value;
    let nome = document.getElementById('input-signup-name').value;
    let data = document.getElementById('input-signup-date').value;
    let dataObj = new Date(data)
    let dataObjNoTimeZone = new Date(dataObj.getTime() + ((dataObj.getTimezoneOffset() * 60000)))
    let email = document.getElementById('input-signup-email').value;
    let password = document.getElementById('input-signup-password').value;

    var user = new Usuario(tipoSelected, nome, dataObjNoTimeZone, email, password);

    await fetch(`${url}/usuario`, {
        method: 'POST',
        body: JSON.stringify({
            tipo: user.tipo,
            nome: user.nome,
            dataNascimento: user.dataNascimento,
            email: user.email,
            senha: user.senha,
            candidaturas: user.candidaturas
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then(response => response.json())
    .then(json => console.log(json))
}

// async function getAllPosts(){
//     const response = await fetch(url);
//     const post = await response.json();

//     post.map(x => {
//         document.getElementById('posts-container').innerHTML += 
//         `<p>${x.id} - ${x.tipo} - ${x.nome}</p>
//         <hr>`;
//     })
// }
// getAllPosts();