const {v4: uuidv4} = require('uuid');

const contas = [];

function criarConta(tipo, saldoInicial = 0){
    if(!['corrente', 'poupanca'].includes(tipo)){
        throw new Error('Tipo de conta inválido. Deve ser "corrente" ou "poupanca".');
    }
    if(saldoInicial < 0){
        throw new Error('Saldo inicial não pode ser negativo.');
    }

    const novaConta = {
        id: uuidv4(),
        tipo,
        saldo: saldoInicial
    };
    contas.push(novaConta);
    return novaConta;
}

function listarContas(){
    return contas;
}

