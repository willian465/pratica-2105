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
    res.status(200).json(db.data.produtos);
  },
  add: function (req, res) {
    console.log("recebi requisição...");
    let { id, nomeProduto, preco, itensEstoque } = req.body;
    db.data.produtos[id] = { nomeProduto, preco, itensEstoque };
    db.write();
    res.status(200).json(db.data.bandasrock);
  },
  update: function (req, res) {
    console.log("recebi requisição...");
    let { id, nomeProduto, preco, itensEstoque } = req.body;
    db.data.produtos[id] = { nomeProduto, preco, itensEstoque };
    db.write();
    res.status(200).json(db.data.bandasrock);
  },
};

export default controller;
