import config from "config";
import express from "express";
import cors from "cors";

console.log("Abrindo super hiper servidor...");

let port = config.get("server.port");
//console.log("porta: ",porta);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

import produtosRoute from "./routes/produtos.js";
produtosRoute(app, config);

import filmesRoute from "./routes/filmes.js";
filmesRoute(app, config);

import musicasRoute from "./routes/musicas.js";
musicasRoute(app, config);

app.listen(port, function () {
  console.log(`Servidor rodando na porta ${port}`);
});
