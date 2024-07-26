const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const projetoRoutes = require('./routes/projeto.js');
const atividadeRoutes = require('./routes/atividade.js');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', projetoRoutes);
app.use('/api', atividadeRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});