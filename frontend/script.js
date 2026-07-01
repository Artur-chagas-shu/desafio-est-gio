const API = 'http://localhost:3000';

const btnCriar = document.getElementById('btnCriar');
const btnSacar = document.getElementById('btnSacar');
const btnTransferir = document.getElementById('btnTransferir');
const listaContas = document.getElementById('listaContas');
const msgSaque = document.getElementById('msgSaque');
const msgTransf = document.getElementById('msgTransf');

async function carregarContas() {
  try {
    const res = await fetch(`${API}/contas`);
    const contas = await res.json();
    listaContas.innerHTML = contas.map(c =>
      `<li>
        <span>${c.id.slice(0,8)}... (${c.tipo})</span>
        <span>R$ ${c.saldo.toFixed(2)}</span>
      </li>`
    ).join('');
  } catch (err) {
    listaContas.innerHTML = '<li>Erro ao carregar contas</li>';
  }
}

btnCriar.addEventListener('click', async () => {
  const tipo = document.getElementById('tipoConta').value;
  const saldoInicial = parseFloat(document.getElementById('saldoInicial').value) || 0;
  try {
    const res = await fetch(`${API}/contas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo, saldoInicial })
    });
    if (!res.ok) {
      const err = await res.json();
      alert(err.erro);
      return;
    }
    document.getElementById('saldoInicial').value = 0;
    carregarContas();
  } catch (e) {
    alert('Erro de conexão');
  }
});

btnSacar.addEventListener('click', async () => {
  const idConta = document.getElementById('saqueId').value.trim();
  const valor = parseFloat(document.getElementById('saqueValor').value);
  if (!idConta || isNaN(valor)) {
    msgSaque.textContent = 'Preencha todos os campos.';
    msgSaque.className = 'mensagem error';
    return;
  }
  try {
    const res = await fetch(`${API}/operacoes/saque`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idConta, valor })
    });
    const data = await res.json();
    if (!res.ok) {
      msgSaque.textContent = data.erro;
      msgSaque.className = 'mensagem error';
    } else {
      const tarifaTexto = data.tarifa > 0 ? ` (tarifa de R$ 1,00 aplicada)` : '';
      msgSaque.textContent = `${data.mensagem} Saldo atual: R$ ${data.conta.saldo.toFixed(2)}${tarifaTexto}`;
      msgSaque.className = 'mensagem success';
      carregarContas();
    }
  } catch (e) {
    msgSaque.textContent = 'Erro de conexão.';
    msgSaque.className = 'mensagem error';
  }
});

btnTransferir.addEventListener('click', async () => {
  const idOrigem = document.getElementById('transfOrigem').value.trim();
  const idDestino = document.getElementById('transfDestino').value.trim();
  const valor = parseFloat(document.getElementById('transfValor').value);
  if (!idOrigem || !idDestino || isNaN(valor)) {
    msgTransf.textContent = 'Preencha todos os campos.';
    msgTransf.className = 'mensagem error';
    return;
  }
  try {
    const res = await fetch(`${API}/operacoes/transferencia`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idOrigem, idDestino, valor })
    });
    const data = await res.json();
    if (!res.ok) {
      msgTransf.textContent = data.erro;
      msgTransf.className = 'mensagem error';
    } else {
      const tarifaTexto = data.tarifa > 0 ? ` (tarifa de R$ 1,00 aplicada)` : '';
      msgTransf.textContent = `${data.mensagem}${tarifaTexto}`;
      msgTransf.className = 'mensagem success';
      carregarContas();
    }
  } catch (e) {
    msgTransf.textContent = 'Erro de conexão.';
    msgTransf.className = 'mensagem error';
  }
});

carregarContas();