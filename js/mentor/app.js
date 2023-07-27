let mentorsData = []; // Definindo a variável mentorsData como uma array vazia

const renderMentor = (mentores) => {
  const dataHeaderFirst = document.getElementById('dataHeaderFirst');
  const dataHeaderSecond = document.getElementById('dataHeaderSecond');
  const dataHeaderThird = document.getElementById('dataHeaderThird');

  dataHeaderFirst.innerHTML = '';
  dataHeaderSecond.innerHTML = '';
  dataHeaderThird.innerHTML = '';

  mentores.forEach((mentor, index) => {
    const btnList = index % 2 === 0 ? 'colorChangeOdd' : 'colorChangeEven';

    dataHeaderFirst.innerHTML += `
      <p class="dataList ${btnList}">${mentor.nome}</p>
    `;
    dataHeaderSecond.innerHTML += `
      <p class="dataList ${btnList}">${mentor.email}</p>
    `;
    dataHeaderThird.innerHTML += `
      <div class="dataList headerContent ${btnList}">
        <button onclick="editarMentor(${mentor.id})" class="btnIcons btnEdit"><i class="fa-solid fa-pencil"></i></button>
        <button onclick="excluirMentor(${mentor.id})" class="btnIcons btnTrash"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
  });
};



// ----------------- FUNÇÃO PARA BUSCAR A LISTA DE MENTORES -----------------
const getMentores = async () => {
  try {
    const response = await fetch("https://apimentorclass.onrender.com/mentores");
    if (!response.ok) {
      throw new Error('Erro ao buscar mentores.');
    }
    const mentores = await response.json();
    mentorsData.push(...mentores);
    renderMentor(mentores); // Corrigindo o nome da função para renderMentor
  } catch (error) {
    console.error("Erro ao buscar mentores:", error);
  }
};


// ----------------- FUNÇÃO PARA FILTRAR A LISTA DE MENTORES COM BASE NA BARRA PESQUISA -----------------

const searchInput = document.getElementById('searchInput');

const filterMentores = () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredMentores = mentorsData.filter(mentor =>
    mentor.nome.toLowerCase().includes(searchTerm) ||
    mentor.email.toLowerCase().includes(searchTerm)
  );
  renderMentor(filteredMentores); // Corrigindo o nome da função para renderMentor
};

// EVENTO DE DIGITAÇÃO NO CAMPO DE PESQUISA
searchInput.addEventListener('input', filterMentores);


//-------------------NEW MENTOR---------------------//
const newMentorBtn = document.getElementById('newMentorBtn');
  newMentorBtn.addEventListener('click', () => {
    window.location = "mentorCadastro.html";
  });

// --------------EDITA MENTOR-------------------
const editarMentor = (id) => {
    window.location = `mentorEditavel.html?id=${id}`
// console.log('Editar Mentor:', idMentor);

};


// --------------DELETA MENTOR--------------------------//
const excluirMentor = async (id) => {
    try {
      await fetch(`https://apimentorclass.onrender.com/mentores/${id}`, {
        method: 'DELETE'
      });
  
      // Remove o mentor do array mentorsData local
      mentorsData = mentorsData.filter(mentor => mentor.id !== id);
  
      // Atualiza a lista de mentores na página
      renderMentor(mentorsData);
    } catch (error) {
      console.error('Erro ao excluir mentor:', error);
    }
  };

//buscar e renderizar os dados dos mentores
getMentores();



//vai para pagina mentoias
const redirectToMentorias = () => {
    window.location = "content\mentoria\mentoriaIndex.html"
  }
 //vai para pagina turmas
 const redirectToClasses = () => {
    window.location = "content\turmas\turmasIndex.html"
 }
 //vai para pagina alunos
 const redirectToAlunos = () => {
    window.location = "content\alunos\alunosIndex.html"
 }
 //retorna a pag novoMentor
 const redirectToMentores = () => {
   window.location = "mentorIndex.html"
 }









// const redirectToPage = (pageName) => {
//     window.location = `/content/${pageName}/${pageName}.html`;
//   };
  
//   // Redirecionar para a página mentorias
//   const mentoria = () => {
//     redirectToPage("mentoria/mentoriaIndex");
//   };
  
//   // Redirecionar para a página turmas
//   const turmas = () => {
//     redirectToPage("turmas");
//   };
  
//   // Redirecionar para a página alunos
//   const alunos = () => {
//     redirectToPage("alunos");
//   };
  
//   // Redirecionar para a página novoMentor
//   const novoMentor = () => {
//     redirectToPage("mentor/novoMentor");
//   };
  