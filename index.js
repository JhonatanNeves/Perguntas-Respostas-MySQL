const express = require("express");
const app = express();
const bodyParcer = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//DataBase

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// ESTOU DIZENDO PARA O EXPRESS USAR O EJS COMO VIEW ENGINE

app.set('view engine','ejs');
app.use(express.static('public'));

//Body Parcer

app.use(bodyParcer.urlencoded({extended: false})); //COMANDO QUE PERMITE QUE ENVIE OS DADOS DO FORM E TRADUZA OS DADOS P/ JS
app.use(bodyParcer.json());

//Rotas

app.get("/",(req, res)=>{
    Pergunta.findAll({ raw: true, order:[ // order para ordenar as perguntas.
        ['id','DESC'] //ASC = crescente
    ]}).then(perguntas => { //raw feito para listar so os dados necessarios raw=cru
        res.render("index", {
            perguntas: perguntas
        });
    });
    
});

app.get("/perguntar",(req, res)=>{
    res.render("perguntar");
});

app.post("/salvarpergunta",(req, res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo:titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where:{id: id}                      // where serve para fazer busca com condições
    }).then(pergunta =>{  
        if(pergunta != undefined){ 
            
            Resposta.findAll({                                     // significa que a pergunta foi achada
                where: { perguntaId: pergunta.id},
                order: [ ['id','DESC'] ]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
              
        }else{                                                       // nao encontrada
            res.redirect("/");
        }
    });
})

app.post("/responder", (req, res)=>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() =>{
        res.redirect("/pergunta/"+perguntaId); //res.redirect("/pergunta/4") 
    });
});

app.listen(3000,()=>{console.log("App rodando!");});