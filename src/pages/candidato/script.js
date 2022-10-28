const url = "http://localhost:3000";
let vagas = [];
const showVagas = document.getElementById("candidatos-vagas");

const getVagas = async () => {
  const response = await fetch(`${url}/vaga`);
  const vagasResponse = await response.json();
  return (vagas = [...vagasResponse]);
};

const postCandidatura = async (idCandidato, nome, nascimento) => {
  await fetch(`http://localhost:3000/vaga`, {
    method: "POST",
    body: JSON.stringify({
      idCandidato: idCandidato,
      nome: nome,
      nascimento: nascimento,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
};

const loadPageCandidato = async () => {
  const idUser = window.location.search.replace("?id=", "");
  console.log(idUser);

  const response = await fetch(`${url}/usuario/${idUser}`);
  var post = await response.json();
  console.log(post);

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
            <td>
                <button type="button" class="btn btn-primary w-100 my-3" data-bs-toggle="modal"
                    data-bs-target="#exampleModal-${vaga.id}">
                    Ver
                </button>
                <div class="modal fade" id="exampleModal-${
                  vaga.id
                }" tabindex="-1"
                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body text-dark">
                                <div class="row">
                                    <div class="col-12 d-flex flex-column">
                                        <div class="d-flex justify-content-between opacity-75">
                                            <p class="my-2">ID da vaga: <span
                                                    id="id-vaga-candidato">${
                                                      vaga.id
                                                    }</span></p>
                                            <p class="my-2">Remuneração: <span
                                                    id="remuneracao-vaga-candidato">${valorVaga}</span></p>
                                        </div>
                                        <div class="opacity-75">
                                            <p class="fw-bold m-0 my-1">Título: <span
                                                    class="fw-light"
                                                    id="titulo-candidato-vaga">${
                                                      vaga.titulo
                                                    }</span></p>
                                            <p class="fw-bold m-0 my-1">Descrição da vaga: <span
                                                    class="fw-light">${
                                                      vaga.descricao
                                                    }</span></p>
                                        </div>
                                        <p class="fw-bold text-center mt-3 opacity-75">Candidatos inscritos
                                            na vaga</p>
                                        <div>
                                            <table class="w-100 opacity-75">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Nome</th>
                                                        <th scope="col" class="text-end">Data de Nascimento</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    ${vaga.candidatos.map(
                                                      (candidato) => {
                                                        return `
                                                        <tr>
                                                            <td>${candidato.nome}</td>
                                                            <td class="text-end py-2">${candidato.nascimento}</td>
                                                        </tr>
                                                        `;
                                                      }
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        <button onclick="postCandidatura(1, 'Daniel', '07/01/2001')" class="btn btn-primary py-2 mt-5 w-75 opacity-100 align-self-center">Candidatar-me</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
        `;
    });
  });
};

loadPageCandidato();
