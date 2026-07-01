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

function buscarConta(id){
    const conta = contas.find (conta => conta.id === id);
    if(!conta){
        throw new Error('Conta não encontrada.');    
}
return conta;
}


function sacar(idConta, valor ){
    const conta = buscarConta(idConta);
    if(valor <= 0) throw new Error('Valor de saque deve ser positivo.');

    if(conta.tipo === "corrente"){
        const tarifa = 1.0;
        const novoSaldo = conta.saldo - valor - tarifa;
        if(novoSaldo < -500){
            throw new Error('Saldo insuficiente. Limite de saldo negativo é de R$ 500,00.');
        }
        conta.saldo = novoSaldo;
        return {conta, tarifa};
    } else if (conta.tipo === "poupanca"){
        if(conta.saldo < valor){
            throw new Error("Saldo insuficiente. Não é permitido saldo negativo em contas poupança.");
        }
        conta.saldo -= valor;
        return {conta, tarifa:0};
    }
}

