import controller from "../controllers/musicas.js";

const nomeRota = "musicas";

export default function (app, config) {
  app
    .route(config.get("server.path_root") + nomeRota)
    .get(controller.listarMusicas);

  app
    .route(config.get("server.path_root") + nomeRota)
    .post(controller.adicionarMusica);

  app
    .route(config.get("server.path_root") + nomeRota + "/:id")
    .get(controller.buscarMusicaPorCodigo);
}
