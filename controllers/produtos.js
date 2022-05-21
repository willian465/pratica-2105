import { Low, JSONFile } from "lowdb";

const adapter = new JSONFile("./banco.json");
const db = new Low(adapter);

db.read()
  .then(function () {})
  .catch(function (e) {
    console.log(e);
  });

const controller = {
  listarProdutos: function (req, res) {
    res.status(200).json(db.data.produtos);
  },
  buscarProdutoPorCodigo: function (req, res) {
    if (req.params.id == undefined || req.params.id <= 0) {
      return res
        .status(400)
        .json({ Message: "Valor inválido para a busca de produtos" });
    }
    let produto = db.data.produtos[req.params.id];
    res.status(200).json(produto);
  },
  adicionarProdutos: function (req, res) {
    if (req.body.id == undefined) {
      return res
        .status(400)
        .json({ Message: "Dados não informados para criar novo produto" });
    }
    let { id, nomeProduto, preco, itensEstoque } = req.body;
    db.data.produtos[id] = { id, nomeProduto, preco, itensEstoque };
    db.write();
    res.status(200).json(db.data.produtos[id]);
  },
};

export default controller;
