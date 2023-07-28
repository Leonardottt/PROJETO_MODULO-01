//------------declarada a var mentorsData como uma array vazia---------//
let mentorsData = [];

const renderAlunos = (alunos) => {
  const dataHeaderFirst = document.getElementById('dataHeaderFirst');
  const dataHeaderSecond = document.getElementById('dataHeaderSecond');
  const dataHeaderThird = document.getElementById('dataHeaderThird');

  dataHeaderFirst.innerHTML = '';
  dataHeaderSecond.innerHTML = '';
  dataHeaderThird.innerHTML = '';

  alunos.forEach((aluno, index) => {
    const btnList = index % 2 === 0 ? 'colorChangeOdd' : 'colorChangeEven';

    dataHeaderFirst.innerHTML += `
      <p class="dataList ${btnList}">${aluno.aluno}</p>
    `;
    dataHeaderSecond.innerHTML += `
      <p class="dataList ${btnList}">${aluno.email}</p>
    `;
    dataHeaderThird.innerHTML += `
      <div class="dataList headerContent ${btnList}">
        <button onclick="editarMentor(${aluno.id})" class="btnIcons btnEdit"><i class="fa-solid fa-pencil"></i></button>
        <button onclick="excluirMentor(${aluno.id})" class="btnIcons btnTrash"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
  });
};



// ----------------- FUNÇÃO PARA BUSCAR A LISTA DE MENTORES -----------------//

const getAlunos = async () => {
  try {
    const response = await fetch("http://localhost:3000/alunos");
    if (!response.ok) {
      throw new Error('Erro ao buscar alunos.');
    }
    const alunos = await response.json();
    mentorsData.push(...alunos);
    renderAlunos(alunos); 
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
  }
};


// ------ FUNÇÃO PARA FILTRAR A LISTA DE MENTORES COM BASE NA BARRA PESQUISA ------------//

const searchInput = document.getElementById('searchInput');

const filterAlunos = () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredAlunos = mentorsData.filter(aluno =>
    aluno.aluno.toLowerCase().includes(searchTerm) ||
    aluno.email.toLowerCase().includes(searchTerm)
  );
  renderAlunos(filteredAlunos); 
};

//-------------EVENTO DE DIGITAÇÃO NO CAMPO DE PESQUISA--------//
searchInput.addEventListener('input', filterAlunos);


//-------------------NEW MENTOR---------------------//
const newStudentBtn = document.getElementById('newStudentBtn');
newStudentBtn.addEventListener('click', () => {
    window.location = "alunoCadastro.html";
  });

// --------------EDITA MENTOR-------------------//
const editarMentor = (id) => {
    window.location = `alunoEditavel.html?id=${id}`
// console.log('Editar Mentor:', idMentor);

};


// --------------DELETA MENTOR--------------------------//
const excluirMentor = async (id) => {
    try {
      await fetch(`http://localhost:3000/alunos/${id}`, {
        method: 'DELETE'
      });
  
//---------------------REMOVE O MENTOR DO ARRAY mentorsData local-----------//
      mentorsData = mentorsData.filter(aluno => aluno.id !== id);
  
//Atualiza lista de mentores na página
      renderAlunos(mentorsData);
    } catch (error) {
      console.error('Erro ao excluir mentor:', error);
    }
  };

//----------BUSCAR E RENDERIZA OS DADOS DOS MENTORES-----------//
getAlunos();