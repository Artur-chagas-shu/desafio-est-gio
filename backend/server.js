const express = require('express');
const cors = require('cors');
const contasRouter = require('./routes/contas');
const operacoesRouter = require('./routes/operacoes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/contas', contasRouter);
app.use('/operacoes', operacoesRouter);

app.listen(PORT, () => {
    console.log(`Backend rodando em http://localhost:${PORT}`);
});