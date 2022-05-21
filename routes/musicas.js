import controller from "../controllers/musicas.js";

const nomeRota = "musicas";

export default function (app, config) {
  app.route(config.get("server.path_root") + nomeRota).get(controller.showList);

  app.route(config.get("server.path_root") + nomeRota).post(controller.add);

  app.route(config.get("server.path_root") + nomeRota).put(controller.update);
}
