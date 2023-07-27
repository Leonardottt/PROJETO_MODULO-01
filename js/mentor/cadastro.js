const novomentor = async (mentores) => {
  try {
    await fetch('https://apimentorclass.onrender.com/mentores', {
      method: 'POST',
      headers: {
        "Accept": 'application/json, text/plain, */*',
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(mentores)
    });
    window.location = "mentorIndex.html";
  } catch (error) {
    console.error("Erro ao criar novo mentor:", error);
  }
};

const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = formulario.elements['nomeMentor'].value;
  const email = formulario.elements['emailMentor'].value;

  if (!validarCamposPreenchidos(nome, email)) {
    alert('Por favor, preencha todos os campos do formulário.');
    return;
  }

  const mentores = {
    nome: nome,
    email: email,
  };

  novomentor(mentores);
});

const validarCamposPreenchidos = (nome, email) => {
  return nome.trim() !== '' && email.trim() !== '';
};



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
 window.location = "../../content/mentor/mentorIndex.html"
}