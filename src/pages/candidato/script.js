const url = "http://localhost:3000";
let vagas = [];
const showVagas = document.getElementById("candidatos-vagas");

const getVagas = async () => {
  const response = await fetch(`${url}/vaga`);
  const vagasResponse = await response.json();
  return (vagas = [...vagasResponse]);
};

const postCandidatura = async (idCandidato, nome, nascimento, idVaga) => {
  const response = await fetch(`${url}/vaga`);
  const vagasResponse = await response.json();
  const vagasCandidato = vagasResponse.filter((vagas) => vagas.id == idVaga)[0]
    .candidatos;
  vagasCandidato.push({
    idCandidato: idCandidato,
    nome: nome,
    nascimento: nascimento,
    reprovado: false,
  });

  await fetch(`http://localhost:3000/vaga/${idVaga}`, {
    method: "PATCH",
    body: JSON.stringify({
      candidatos: vagasCandidato,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

const removeCandidatura = async (idCandidato, idVaga) => {
  const response = await fetch(`${url}/vaga`);
  const vagasResponse = await response.json();
  const vagasCandidato = vagasResponse.filter((vagas) => vagas.id == idVaga)[0]
    .candidatos;
  const candidato = vagasCandidato.filter(
    (candidato) => candidato.idCandidato == idCandidato
  )[0];
  const index = vagasCandidato.indexOf(candidato);

  vagasCandidato.splice(index, 1);

  await fetch(`http://localhost:3000/vaga/${idVaga}`, {
    method: "PATCH",
    body: JSON.stringify({
      candidatos: vagasCandidato,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

const loadPageCandidato = async (e) => {
  const idUser = window.location.search.replace("?id=", "");
  const response = await fetch(`${url}/usuario/${idUser}`);
  let post = await response.json();

  getVagas().then((vaga) => {
    vaga.map((vaga) => {
      const valorVaga = Number(vaga.remuneracao).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      const getHtmlCandidatos = () => {
        if (vaga.candidatos == null) {
          return;
        } else {
          return vaga.candidatos.map((candidato) => {
            return `
            <tr>
                <td>${candidato.nome}</td>
                <td class="text-end py-2">${candidato.nascimento.split("T")[0].split("-").reverse().join("/")}</td>
            </tr>
            `;
          }).join("");
        }
      };

      const checarCandidatura = () => {
        if (vaga.candidatos == null) {
          return;
        } else {
          const candidato = vaga.candidatos.filter(
            (candidato) => candidato.idCandidato == idUser
          );
          if (candidato.length > 0) {
            if (candidato[0].reprovado) {
              return `
              <button class="btn btn-danger" disabled>Reprovado</button>
              `;
            } else
              return `
            <button class="btn btn-danger" onclick="removeCandidatura(${idUser}, ${vaga.id})">Remover Candidatura</button>
            `;
          } else {
            return `<button class="btn btn-primary" onclick="postCandidatura(${post.id}, '${post.nome}', '${post.dataNascimento}', ${vaga.id})">Candidatar</button>`;
          }
        }
      };

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
                                            <p class="my-2">Remunera????o: <span
                                                    id="remuneracao-vaga-candidato">${valorVaga}</span></p>
                                        </div>
                                        <div class="opacity-75">
                                            <p class="fw-bold m-0 my-1">T??tulo: <span
                                                    class="fw-light"
                                                    id="titulo-candidato-vaga">${
                                                      vaga.titulo
                                                    }</span></p>
                                            <p class="fw-bold m-0 my-1">Descri????o da vaga: <span
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
                                                  ${getHtmlCandidatos()}
                                                </tbody>
                                            </table>
                                        </div>
                                        ${checarCandidatura()}
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
