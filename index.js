const express = require("express");
const app = express();

// ESTOU DIZENDO PARA O EXPRESS USAR O EJS COMO VIEW ENGINE
app.set('view engine','ejs');
app.use(express.static('public'));

app.get("/",(req, res)=>{
    res.render("index");
});

app.listen(3000,()=>{console.log("App rodando!");});