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
        <span class="info-conta">
          <span class="id-conta" title="${c.id}">${c.id}</span> 
          <span class="tipo-conta">(${c.tipo})</span>
        </span>
        <span class="acoes-conta">
          <span class="saldo-conta">R$ ${c.saldo.toFixed(2)}</span>
          <button class="btn-copiar" onclick="copiarId('${c.id}')" title="Copiar ID">📋</button>
        </span>
      </li>`
    ).join('');
  } catch (err) {
    listaContas.innerHTML = '<li>Erro ao carregar contas</li>';
  }
}

function copiarId(id) {
  navigator.clipboard.writeText(id)
    .then(() => alert('ID copiado!'))
    .catch(() => alert('Erro ao copiar. Tente manualmente.'));
}

// Criar conta
btnCriar.addEventListener('click', async () => {
  const tipo = document.getElementById('tipoConta').value;
  const saldoInicial = parseFloat(document.getElementById('saldoInicial').value) || 0;
  try {
    const res = await fetch(`${API}/contas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo, saldoInicial })
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.erro || `Erro ${res.status}`);
      return;
    }
    document.getElementById('saldoInicial').value = 0;
    carregarContas();
  } catch (e) {
    alert('Erro de conexão ao criar conta.');
  }
});

// Saque
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
      msgSaque.textContent = data.erro || `Erro ${res.status}`;
      msgSaque.className = 'mensagem error';
      console.error('Erro no saque:', data.erro || `Status ${res.status}`);
    } else {
      const tarifaTexto = data.tarifa > 0 ? ` (tarifa de R$ 1,00 aplicada)` : '';
      msgSaque.textContent = `${data.mensagem} Saldo atual: R$ ${data.conta.saldo.toFixed(2)}${tarifaTexto}`;
      msgSaque.className = 'mensagem success';
      carregarContas();
    }
  } catch (e) {
    msgSaque.textContent = 'Erro de conexão.';
    msgSaque.className = 'mensagem error';
    console.error('Falha na requisição de saque:', e);
  }
});

// Transferência
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
      msgTransf.textContent = data.erro || `Erro ${res.status}`;
      msgTransf.className = 'mensagem error';
      console.error('Erro na transferência:', data.erro || `Status ${res.status}`);
    } else {
      const tarifaTexto = data.tarifa > 0 ? ` (tarifa de R$ 1,00 aplicada)` : '';
      msgTransf.textContent = `${data.mensagem}${tarifaTexto}`;
      msgTransf.className = 'mensagem success';
      carregarContas();
    }
  } catch (e) {
    msgTransf.textContent = 'Erro de conexão.';
    msgTransf.className = 'mensagem error';
    console.error('Falha na requisição de transferência:', e);
  }
});

// Carregar contas ao iniciar
carregarContas();