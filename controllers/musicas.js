import { Low, JSONFile } from "lowdb";

const adapter = new JSONFile("./banco.json");
const db = new Low(adapter);

db.read()
  .then(function () {})
  .catch(function (e) {
    console.log(e);
  });

const controller = {
  listarMusicas: function (req, res) {
    let response = {
      rota: "Rota para listar todos as músicas",
      dados: db.data.musicas,
    };
    res.status(200).json(response);
  },
  buscarMusicaPorCodigo: function (req, res) {
    if (req.params.id == undefined || req.params.id <= 0) {
      return res
        .status(400)
        .json({ Message: "Valor inválido para a busca de músicas" });
    }
    let musica = db.data.musicas[req.params.id];
    let response = {
      rota: "Rota de buscar música por código",
      dados: musica,
    };
    res.status(200).json(response);
  },
  adicionarMusica: function (req, res) {
    if (req.body.id == undefined) {
      return res
        .status(400)
        .json({ Message: "Dados não informados para criar nova música" });
    }
    let { id, nomeMusica, duracao, idioma, genero, autor } = req.body;
    db.data.musicas[id] = { id, nomeMusica, duracao, idioma, genero, autor };
    db.write();

    let response = {
      rota: "Rota salvar um novo filme",
      dados: db.data.musicas[id],
    };
    res.status(200).json(response);
  },
};

export default controller;
