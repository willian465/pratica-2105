import controller from "../controllers/produtos.js";

const nomeRota = "produtos";

export default function (app, config) {
  app
    .route(config.get("server.path_root") + nomeRota)
    .get(controller.listarProdutos);

  app
    .route(config.get("server.path_root") + nomeRota)
    .post(controller.adicionarProdutos);

  app
    .route(config.get("server.path_root") + nomeRota + "/:id")
    .get(controller.buscarProdutoPorCodigo);
}
