import controller from "../controllers/filmes.js";

const nomeRota = "filmes";

export default function (app, config) {
  app
    .route(config.get("server.path_root") + nomeRota)
    .get(controller.listarFilmes);

  app
    .route(config.get("server.path_root") + nomeRota)
    .post(controller.salvarNovoFilme);

  app
    .route(config.get("server.path_root") + nomeRota + "/:id")
    .get(controller.buscarFilmePorCodigo);

  console.log(`Rota [${nomeRota}] carregada...`);
}
