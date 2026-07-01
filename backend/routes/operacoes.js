const express = require('express');
const router = express.Router();
const banco = require('../services/banco');

router.post('/saque',(req, res)=>{
    try{
        const { idConta, valor } = req.body;
        const resultado = banco.sacar(idConta, valor);
        const {conta, tarifa} = resultado;
        const msg = tarifa > 0 
              ? `Saque realizado. Tarifa de R$ 1,00 cobrada.`
            : 'Saque realizado (isento de tarifa).';
        res.json({mensagem: msg, conta, tarifa});
    }catch(err){ 
        res.status(400).json({ error: err.message });
    }
});

router.post('/transferencia', (req, res) => { 
    try{
        const {idOrigem, idDestino, valor} = req.body;
        const resultado = banco.transferir(idOrigem, idDestino, valor);
        const {origem, destino, tarifa} = resultado;
            const msg = tarifa > 0
      ? `Transferência realizada. Tarifa de R$ 1,00 cobrada da conta de origem.`
      : 'Transferência realizada (isenta de tarifa).';
      res.json({mensagem: msg, origem, destino, tarifa});

    }catch(err){
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;