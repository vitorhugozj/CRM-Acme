const express = require('express');
const app = express();
const port = 8080;


app.use(express.json());  // analisar as requisições


// obter rota dos filmes
app.get('/films', (req, res) => { 
    req.body
    res.body // consulta todos os filmes e os retorna como um json
});

// obter rota para adicionar um novo filme 
app.post('/films', (req, res) => {
  const { titulo, valor, ano } = req.body;  // insere um novo filme no banco de dados e manda uma mensagem se foi adicionado com sucesso ou nao 
});

 // obter rota para atualizar um filme
app.put('/films/:id', (req, res) => {
  const { id } = req.params;
  const { title, price, year } = req.body; // atualiza filme atráves do id e manda uma mensagem se foi excluido com sucesso ou nao
});

// obter rota para excluir filme
app.delete('/films/:id', (req, res) => { // deleta filme atráves do id e indica e envia uma resposta se foi excluido com sucesso ou nao
  const { id } = req.params;

});

app.listen(port, () => {
  console.log(`Acme Filmes app listening at http://localhost:${port}`);
});



