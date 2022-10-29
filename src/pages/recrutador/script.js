const url2 = "http://localhost:3000";
let vagas = [];
let candidatos = [];
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
      showVagas.innerHTML += `
    <tr class="text-black-50">
        <td>${vaga.titulo}</td>
        <td class="text-end px-3">${valorVaga}</td>
        <td><button onClick="candidatosNaVaga(this.id)" id='${vaga.id}' class="btn btn-primary w-100 my-3" data-bs-toggle="modal"
            data-bs-target="#recrutador-ver-vaga">Ver</button></td>
    </tr>
        `;
    });
  });
};

loadPageRecrutador();
const deleteVaga = async (idVaga) => {
  const response = await fetch(`${url}/vaga`);
  const vagasResponse = await response.json();
  const vagasCandidato = vagasResponse.filter((vagas) => vagas.id == idVaga);

  await fetch(`http://localhost:3000/vaga/${idVaga}`, {
    method: "DELETE",
    body: JSON.stringify({
      vaga: vagasCandidato,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

async function reprovarCandidao(e, idVaga) {
  e.disabled = true;
  const response = await fetch(`${url}/vaga/`);
  const vagasResponse = await response.json();
  const candidatosAtualizados = vagasResponse.filter(
    (vagas) => vagas.id == idVaga
  )[0].candidatos;
  const candidatoReprovado = candidatosAtualizados.find(
    (candidatos) => candidatos.idCandidato == e.id
  );

  await fetch(`http://localhost:3000/vaga/${idVaga}`, {
    method: "PATCH",
    body: JSON.stringify({
      candidatos: [{ ...candidatoReprovado, reprovado: true }],
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

const candidatosNaVaga = async (id) => {
  const formVaga = document.querySelector("#cardVaga");
  formVaga.innerHTML = "";

  const vagaModal = getVagas().then((vaga) => {
    return vaga.find((vaga) => vaga.id == id);
  });
  await vagaModal.then((vaga) => {
    const valorVaga = Number(vaga.remuneracao).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return (formVaga.innerHTML += `
        <div class="d-flex flex-row justify-content-between">
        <div><span class="fw-bold">ID da vaga:</span>${vaga.id}</div>
        <div><span class="fw-bold">Remuneração:</span>${valorVaga}</div>
        </div>
            <div>
                    <span class="fw-bold">Título:</span>${vaga.titulo}
                </div>
                <div>
                    <span class="fw-bold">Descrição da vaga:</span>${
                      vaga.descricao
                    }
            </div>
        <div class="text-center fw-bold mt-3 mb-3">Candidatos inscritos na vaga</div>
        <table class="w-100">
            <tbody>
                <tr>
                    <th>Nome</th>
                    <th>Data de Nascimento</th>
                    <th></th>
                </tr>
                ${vaga.candidatos.map((candidato) => {
                  let disabled = "";
                  if (candidato.reprovado == true) {
                    disabled = "disabled";
                  }
                  return `
                  <tr class="text-black-50">
                    <td>${candidato.nome}</td>
                    <td class="text-end px-3">${candidato.nascimento}</td>
                    <td><button id="${candidato.idCandidato}" onclick="reprovarCandidao(this, ${vaga.id})" ${disabled} class="btn btn-danger w-100 my-3">Reprovar</button></td>
                </tr>
                `;
                })}
                </tbody>
            </table>
            <div class="modal-footer justify-content-center">
                <button type="button" onclick="deleteVaga(${vaga.id})" class="btn btn-primary mt-3 w-75">Excluir Vaga</button>
            </div>
        `);
  });
};
