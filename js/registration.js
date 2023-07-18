//////// ---------------------------------CADASTRA A MENTORIA -----------------------------///////


const form = document.querySelector("#formulario"); // Selecionando o formulário pelo ID

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = form.elements['nomeMentor'].value;
  const email = form.elements['emailMentor'].value;

  // Validando se tá tudo preenchido
  if (nome === "" || email === "") {
    alert("Preencha todos os campos!");
    return; // Impede o envio do form se algum campo estiver vazio
  }
  const mentor = {
    nome,
    email
  };

  try {
    cadastrarMentor(mentor); //ñ é necessário usar await aqui
    redirectToMentorIndex();
  } catch (error) {
    console.error("Erro ao cadastrar mentor:", error);
  }
});

async function cadastrarMentor(mentor) {
  const response = await fetch("http://localhost:3000/mentores", {
    method: 'POST',
    headers: {
      "Accept": 'application/json, text/plain, */*',
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(mentor)
  });

  if (!response.ok) {
    throw new Error('Erro ao cadastrar o mentor.');
  }
}

function redirectToMentorIndex() {
  window.location = 'mentorIndex.html';
}

// ----------------------------------------------------------------------//