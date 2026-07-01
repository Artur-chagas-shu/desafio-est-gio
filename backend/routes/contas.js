const express = require('express');
const router = express.Router();
const banco = require('../services/banco');

router.post('/', (req, res) => {
    try {
        const { tipo, saldoInicial } = req.body;
        const conta = banco.criarConta(tipo, saldoInicial);
        res.status(201).json(conta);
    }catch(err){
        res.status(400).json({ error: err.message });
    }});



    router.get('/', (req, res) => {
        res.json(banco.listarContas());
    });


    module.exports = router;