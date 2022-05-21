import controller from "../controllers/filmes.js";

const nomeRota = "filmes";

export default function (app, config) {
  app.route(config.get("server.path_root") + nomeRota).get(controller.showList);

  app.route(config.get("server.path_root") + nomeRota).post(controller.add);

  app.route(config.get("server.path_root") + nomeRota).put(controller.update);

  app
    .route(config.get("server.path_root") + nomeRota + "/:id")
    .get(controller.BuscarFilmePorCodigo);

  console.log(`Rota [${nomeRota}] carregada...`);
}
