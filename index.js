const express = require("express");
const app = express();

// ESTOU DIZENDO PARA O EXPRESS USAR O EJS COMO VIEW ENGINE
app.set('view engine','ejs');

app.get("/:nome/:lang",(req, res)=>{
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = true;

    var produtos = [
        {nome:"Doritos", preco:8.99},
        {nome:"Coca-Lata", preco:5},
        {nome:"Leite", preco:3.49}
    ]

    res.render("index",{
        nome: nome,
        lang: lang,
        empresa: "Guia do Jiraya",
        inscritos: 8000,
        msg: exibirMsg
    });
});

app.listen(3000,()=>{console.log("App rodando!");});