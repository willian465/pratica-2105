import { Low, JSONFile } from "lowdb";

const adapter = new JSONFile("./banco.json");
const db = new Low(adapter);

db.read()
  .then(function () {})
  .catch(function (e) {
    console.log(e);
  });

const controller = {
  listarFilmes: function (req, res) {
    res.status(200).json(db.data.filmes);
  },

  buscarFilmePorCodigo: function (req, res) {
    if (req.params.id == undefined || req.params.id <= 0) {
      return res
        .status(400)
        .json({ Message: "Valor inválido para a busca de filmes" });
    }
    let filme = db.data.filmes[req.params.id];
    res.status(200).json(filme);
  },
  salvarNovoFilme: function (req, res) {
    if (req.body.id == undefined) {
      return res
        .status(400)
        .json({ Message: "Dados não informados para criar novo filme" });
    }
    let { id, nomeFilme, dataEstreia, duracao } = req.body;
    db.data.filmes[id] = { id, nomeFilme, dataEstreia, duracao };
    db.write();
    res.status(200).json(db.data.filmes[id]);
  },
};

export default controller;
