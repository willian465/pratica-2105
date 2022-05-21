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
    console.log(db.data);
    console.log("aqui deu bom");
    res.status(200).json(db.data.musicas);
  },
  add: function (req, res) {
    console.log("recebi requisição...");
    let { id, nomeMusica, duracao, idioma, genero } = req.body;
    db.data.musicas[id] = { nomeMusica, duracao, idioma, genero };
    db.write();
    res.status(200).json(db.data.musicas);
  },
  update: function (req, res) {
    console.log("recebi requisição...");
    let { id, nomeMusica, duracao, idioma } = req.body;
    db.data.produtos[id] = { nomeMusica, duracao, idioma };
    db.write();
    res.status(200).json(db.data.musicas);
  },
};

export default controller;
