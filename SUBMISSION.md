# Minha Solução — Banco

> Substitua o conteúdo entre colchetes pelas informações da sua solução.
> Estas informações (aqui ou no README do seu fork) são **obrigatórias**.

## Stack
- **Backend:** Node.js 20+ (JavaScript com Express) — testado na versão 24.18.0
- **Frontend:** HTML/CSS/JS puro (vanilla)

## Pré-requisitos / dependências
- Node.js (versão 16 ou superior; recomendada 20+)
- NPM (incluso na instalação do Node.js)
- Navegador web moderno

Instalação das dependências do backend:
```bash
cd backend
npm install

## Como executar

### Backend (API)
```bash
# 
cd backend
npm start
API disponível em http://localhost:3000
```

### Frontend
```bash
Abra o arquivo frontend/index.html diretamente no navegador (clique duplo ou use uma extensão como Live Server no VS Code).
 O backend precisa estar rodando para que o frontend funcione corretamente.
```

## Exemplo de uso
```
Acesse o frontend pelo navegador.

Crie uma conta corrente com saldo inicial de R$ 200,00.

Na lista de contas, copie o ID gerado (os primeiros caracteres aparecem).

Vá até a seção Saque, cole o ID, informe o valor R$ 50,00 e clique em Sacar.

    A API retornará: "Saque realizado. Tarifa de R$ 1,00 cobrada."

    O novo saldo exibido será R$ 149,00 (200 - 50 - 1).

Tente sacar mais R200,00:aAPIretornaraˊerroinformandoqueolimitedesaldonegativoeˊdeR200,00:aAPIretornaraˊerroinformandoqueolimitedesaldonegativoeˊdeR 500,00.

Crie uma conta poupança com R30,00etentesacarR30,00etentesacarR 50,00 — a API retornará "Saldo insuficiente" (poupança não permite saldo negativo).

Teste também a transferência entre contas, observando a cobrança de tarifa quando a origem for corrente.
```

## Observações (opcional)
-As regras de tarifa e limite de saldo negativo estão implementadas exclusivamente no backend.

Contas são armazenadas em memória (array) — reiniciar o backend limpa os dados.

IDs gerados com UUID v4 garantem identificação única.

A transferência é um diferencial e funciona respeitando as mesmas regras de tipo de conta.

O layout do frontend é responsivo simples, mas funcional.

Testado no Windows 11 com Node.js 24.18.0.
