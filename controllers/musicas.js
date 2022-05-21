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
    res.status(200).json(db.data.musicas);
  },
  buscarMusicaPorCodigo: function (req, res) {
    if (req.params.id == undefined || req.params.id <= 0) {
      return res
        .status(400)
        .json({ Message: "Valor inválido para a busca de músicas" });
    }
    let musica = db.data.musicas[req.params.id];
    res.status(200).json(musica);
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
    res.status(200).json(db.data.musicas[id]);
  },
};

export default controller;
