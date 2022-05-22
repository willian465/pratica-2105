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
    let response = {
      rota: "Rota para listar todos os produtos",
      dados: db.data.produtos,
    };
    res.status(200).json(response);
  },
  buscarProdutoPorCodigo: function (req, res) {
    if (req.params.id == undefined || req.params.id <= 0) {
      return res
        .status(400)
        .json({ Message: "Valor inválido para a busca de produtos" });
    }
    let produto = db.data.produtos[req.params.id];

    let response = {
      rota: "Rota de buscar pruduto por código",
      dados: produto,
    };
    res.status(200).json(response);
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
    let response = {
      rota: "Rota salvar um novo produto",
      dados: db.data.produtos[id],
    };

    res.status(200).json(response);
  },
};

export default controller;
