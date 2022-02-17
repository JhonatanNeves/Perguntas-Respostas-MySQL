const express = require("express");
const app = express();
const bodyParcer = require("body-parser");

// ESTOU DIZENDO PARA O EXPRESS USAR O EJS COMO VIEW ENGINE

app.set('view engine','ejs');
app.use(express.static('public'));

//Body Parcer

app.use(bodyParcer.urlencoded({extended: false})); //COMANDO QUE PERMITE QUE ENVIE OS DADOS DO FORM E TRADUZA OS DADOS P/ JS
app.use(bodyParcer.json());

//Rotas

app.get("/",(req, res)=>{
    res.render("index");
});

app.get("/perguntar",(req, res)=>{
    res.render("perguntar");
});

app.post("/salvarpergunta",(req, res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("Formulário recebido! titulo " + titulo + " " + " descricao " + descricao);
});

app.listen(3000,()=>{console.log("App rodando!");});