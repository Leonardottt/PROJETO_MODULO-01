// Função para renderizar os mentores na tabela
const renderMentores = (mentores) => {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';
  
    mentores.forEach((mentor, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${mentor.id}</td>
        <td>${mentor.nome}</td>
        <td>${mentor.email}</td>
        <td>
          <button class="btn-editar" onclick="editarMentor(${mentor.id})">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn-excluir" onclick="deletarMentor(${mentor.id})">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
  
      // Adicionar classe de cor para linhas alternadas
      if (index % 2 === 0) {
        row.classList.add('cor-list-cinza100');
      } else {
        row.classList.add('cor-list-cinza50');
      }
  
      tableBody.appendChild(row);
    });
  };
  
  // Função para obter os mentores da API
  const getMentores = async (textoPesquisa = null) => {
    let pesquisa = '';
    if (textoPesquisa) {
      pesquisa = `?q=${textoPesquisa}`;
    }
  
    const response = await fetch(`https://api-projeto-de-conclusao-do-modulo-1.onrender.com/mentores${pesquisa}`);
    const mentores = await response.json();
  
    renderMentores(mentores);
  };
  
  // Função para realizar a pesquisa ao pressionar Enter
  const search = document.getElementById('search');
  search.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      const pesquisa = search.value;
      getMentores(pesquisa);
    }
  });
  
  // Função para realizar a pesquisa ao clicar na lupa
  const searchGlass = document.getElementById('searchGlass');
  searchGlass.addEventListener('click', (e) => {
    const pesquisa = search.value;
    getMentores(pesquisa);
  });
  
  // Função para redirecionar para a página de cadastro de novo mentor
  const newMentorBtn = document.getElementById('newMentorBtn');

  // Adiciona o evento de clique ao botão
  newMentorBtn.addEventListener('click', () => {
  // Redireciona para a página "mentorCadastro.html"
  window.location = "mentoriaCadastro.html";
});
  
  // Função para redirecionar para a página de edição de mentor com base no ID
  const editarMentor = (id) => {
    window.location = `/html/mentores/editarMentor.html?id=${id}`;
  };
  
  // Função para deletar um mentor com base no ID e atualizar a tabela
  const deletarMentor = async (id) => {
    await fetch(`http://localhost:3000/mentores/${mentorId}`, {
      method: 'DELETE',
    });
    getMentores();
  };
  
  // Função para ajustar a cor do botão no menu lateral
  const btnMentores = () => {
    const mentorGeralBtn = document.getElementById('mentorGeral');
    mentorGeralBtn.classList.toggle('btnstatic-purple');
  };
  btnMentores();
  
  // Funções do menu lateral
  const mentorIndex = () => {
    window.location = "mentorIndex.html";
  };
  const mentoriaIndex = () => {
    window.location = "mentoriaIndex.html";
  };
  const turmaIndex = () => {
    window.location = "turmaIndex.html";
  };
  const alunoIndex = () => {
    window.location = "alunoIndex.html";
  };