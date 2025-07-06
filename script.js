const API = 'http://127.0.0.1:5000';

async function fetchLivros() {
  const res = await fetch(`${API}/listar_livros`);
  const livros = await res.json();
  renderLivros(livros);
}

async function fetchEmprestimos() {
  const res = await fetch(`${API}/listar_emprestimos`);
  const emprestimos = await res.json();
  renderEmprestimos(emprestimos);
}

function renderLivros(livros) {
  const container = document.getElementById('livros');
  container.innerHTML = '';
  livros.forEach(livro => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <strong>${livro.titulo}</strong> - ${livro.autor} <br>
      ${livro.disponivel ? `<button onclick="emprestarLivro(${livro.id})">Emprestar</button>` : '<em>Indisponível</em>'}
    `;
    container.appendChild(card);
  });
}

function renderEmprestimos(emprestimos) {
  const container = document.getElementById('emprestimos');
  container.innerHTML = '';
  emprestimos.forEach(e => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <strong>${e.livro}</strong> para <em>${e.aluno}</em> <br>
      Empréstimo: ${new Date(e.data_emprestimo).toLocaleString()} <br>
      ${e.data_devolucao ? `Devolvido: ${new Date(e.data_devolucao).toLocaleString()}` : `<button onclick="devolverLivro(${e.id})">Devolver</button>`}
    `;
    container.appendChild(card);
  });
}

document.getElementById('alunoForm').onsubmit = async (e) => {
  e.preventDefault();
  const nome = document.getElementById('alunoNome').value;
  await fetch(`${API}/cadastrar_aluno`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({nome})
  });
  document.getElementById('alunoForm').reset();
  alert('Aluno cadastrado!');
};

document.getElementById('livroForm').onsubmit = async (e) => {
  e.preventDefault();
  const titulo = document.getElementById('livroTitulo').value;
  const autor = document.getElementById('livroAutor').value;
  await fetch(`${API}/cadastrar_livro`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({titulo, autor})
  });
  document.getElementById('livroForm').reset();
  fetchLivros();
};

window.emprestarLivro = async (livro_id) => {
  const aluno_id = prompt('ID do aluno que vai emprestar:');
  if (!aluno_id) return;
  await fetch(`${API}/emprestar_livro`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({aluno_id, livro_id})
  });
  fetchLivros();
  fetchEmprestimos();
};

window.devolverLivro = async (emprestimo_id) => {
  await fetch(`${API}/devolver_livro`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({emprestimo_id})
  });
  fetchLivros();
  fetchEmprestimos();
};

window.onload = () => {
  fetchLivros();
  fetchEmprestimos();
};