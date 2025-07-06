const API = "http://127.0.0.1:5000";

// Aluno
document.getElementById('form-aluno').onsubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const res = await fetch(`${API}/alunos`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    const msg = await res.json();
    document.getElementById('aluno-msg').innerText = msg.message || JSON.stringify(msg);
    listarAlunos();
    e.target.reset();
};

async function listarAlunos() {
    const res = await fetch(`${API}/alunos`);
    const alunos = await res.json();
    const ul = document.getElementById('lista-alunos');
    ul.innerHTML = "";
    alunos.forEach(a => {
        ul.innerHTML += `<li>ID: ${a.id} | Nome: ${a.nome} | Matrícula: ${a.matricula} | Email: ${a.email} | Telefone: ${a.telefone}</li>`;
    });
}

// Livro
document.getElementById('form-livro').onsubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.edicao = parseInt(data.edicao);
    data.ano_publicacao = parseInt(data.ano_publicacao);
    const res = await fetch(`${API}/livros`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    const msg = await res.json();
    document.getElementById('livro-msg').innerText = msg.message || JSON.stringify(msg);
    listarLivros();
    e.target.reset();
};

async function listarLivros() {
    const res = await fetch(`${API}/livros`);
    const livros = await res.json();
    const ul = document.getElementById('lista-livros');
    ul.innerHTML = "";
    livros.forEach(l => {
        ul.innerHTML += `<li>ID: ${l.id} | Título: ${l.titulo} | Autor: ${l.autor} | Editora: ${l.editora} | Edição: ${l.edicao} | Ano: ${l.ano_publicacao} | Disponível: ${l.disponivel ? "Sim" : "Não"}</li>`;
    });
}

// Empréstimo
document.getElementById('form-emprestimo').onsubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.aluno_id = parseInt(data.aluno_id);
    data.livro_id = parseInt(data.livro_id);
    const res = await fetch(`${API}/emprestimos`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    const msg = await res.json();
    document.getElementById('emprestimo-msg').innerText = msg.message || JSON.stringify(msg);
    listarEmprestimos();
    listarLivros();
    e.target.reset();
};

// Devolução
document.getElementById('form-devolucao').onsubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.emprestimo_id = parseInt(data.emprestimo_id);
    const res = await fetch(`${API}/emprestimos`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    const msg = await res.json();
    document.getElementById('devolucao-msg').innerText = msg.message || JSON.stringify(msg);
    listarEmprestimos();
    listarLivros();
    e.target.reset();
};

// Listar empréstimos
async function listarEmprestimos() {
    const res = await fetch(`${API}/emprestimos`);
    const emprestimos = await res.json();
    const ul = document.getElementById('lista-emprestimos');
    ul.innerHTML = "";
    emprestimos.forEach(e => {
        ul.innerHTML += `<li>ID: ${e.id} | Aluno: ${e.aluno_id} | Livro: ${e.livro_id} | Empréstimo: ${e.data_emprestimo} | Limite: ${e.data_limite_devolucao} | Devolução: ${e.data_devolucao || "-"} | Em atraso: ${e.devolvido_em_atraso ? "Sim" : "Não"}</li>`;
    });
}

// Inicialização
listarAlunos();
listarLivros();
listarEmprestimos();