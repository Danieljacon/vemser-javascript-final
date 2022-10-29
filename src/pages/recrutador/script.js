const url2 = "http://localhost:3000";
let vagas = [];
const showVagas = document.getElementById("recrutador-vagas");

const getVagas = async () => {
    const response = await fetch(`${url2}/vaga`);
    const vagasResponse = await response.json();
    return (vagas = [...vagasResponse]);
  };


const loadPageRecrutador = async (e) => {

getVagas().then((vaga) => {
    vaga.map((vaga) => {
    const valorVaga = Number(vaga.remuneracao).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
    showVagas.innerHTML +=  `
    <tr class="text-black-50">
        <td>'${vaga.titulo}'</td>
        <td class="text-end px-3">'${valorVaga}'</td>
        <td><button class="btn btn-primary w-100 my-3" data-bs-toggle="modal"
            data-bs-target="#recrutador-ver-vaga">Ver</button></td>
    </tr>
        `
    })}
)}
  
loadPageRecrutador()

