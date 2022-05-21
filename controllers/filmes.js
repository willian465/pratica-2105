import { Low, JSONFile } from "lowdb";

const adapter = new JSONFile("./banco.json");
const db = new Low(adapter);

db.read()
  .then(function () {
    console.log("banco carregado");
  })
  .catch(function (e) {
    console.log(e);
  });

const controller = {
  showList: function (req, res) {
    //console.log(db.data);
    res.status(200).json(db.data.filmes);
  },

  BuscarFilmePorCodigo: function (req, res) {
    if (req.params.id == undefined || req.params.id <= 0) {
      return res
        .status(400)
        .json({ Message: "Valor inválido para a busca de filmes" });
    }
    let filme = db.data.filmes[req.params.id];
    res.status(200).json(filme);
  },
  add: function (req, res) {
    console.log("recebi requisição...");
    let { id, nomeFilme, dataEstreia, duracao } = req.body;
    db.data.filmes[id] = { nomeFilme, dataEstreia, duracao };
    db.write();
    res.status(200).json(db.data.filmes);
  },
  update: function (req, res) {
    console.log("recebi requisição...");
    let { id, nomeFilme, dataEstreia, duracao } = req.body;
    db.data.filmes[id] = { nomeFilme, dataEstreia, duracao };
    db.write();
    res.status(200).json(db.data.filmes);
  },
};

export default controller;
