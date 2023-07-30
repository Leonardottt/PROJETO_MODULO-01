document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
  
    signupForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      if (username.trim() === '' || password.trim() === '') {
        alert('Por favor, preencha todos os campos do formulário.');
        return; 
      }
  
      //-----------Salvando no DB STORAGE------------------//
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
  
      alert('Cadastro realizado com sucesso!');
      window.location.href = "../../index.html";
    });
  });
  