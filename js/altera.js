document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    let mentoresId = null;
  
    const getIdUrl = () => {
      const paramsString = window.location.search;
      const params = new URLSearchParams(paramsString);
      mentoresId = params.get('id');
    };
  
    const buscaMentor = async () => {
      const response = await fetch(`http://localhost:3000/mentores/${mentoresId}`);
      const mentor = await response.json();
      return mentor;
    };
  
    const alteraItem = async (mentor) => {
      await fetch(`http://localhost:3000/mentores/${mentoresId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mentor)
      });
  
      window.location = 'mentorIndex.html';
    };
  
    const carregarDadosFormulario = async (mentor) => {
      document.getElementById('nameChange').value = mentor.nome;
      document.getElementById('emailChange').value = mentor.email;
    };
  
    const carregarDados = async () => {
      getIdUrl();
      const mentor = await buscaMentor();
      carregarDadosFormulario(mentor);
    };
  
    formulario.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const nome = formulario.elements['nameChange'].value;
      const email = formulario.elements['emailChange'].value;
  
      if (nome.trim() === '' || email.trim() === '') {
        alert('Por favor, preencha todos os campos do formulário.');
        return;
      }
  
      const mentor = {
        nome,
        email
      };
  
      await alteraItem(mentor);
    });
  
    carregarDados();
  });
  