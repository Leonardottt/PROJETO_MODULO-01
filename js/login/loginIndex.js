// document.getElementById("btnLogin").addEventListener("click", function(event) {
//     event.preventDefault(); // Evita que o formulário seja submetido (caso haja um "submit" no form)
    
//     // Verificar se os campos do formulário estão preenchidos
//     const email = document.getElementById("emailLoginIndex").value.trim();
//     const senha = document.getElementById("passwordLoginIndex").value.trim();
  
//     if (email === "" || senha === "") {
//         alert("Por favor, preencha todos os campos do formulário.");
//     } else {
//         window.location.href = "content/mentor/mentorIndex.html";
//     }
// });

document.addEventListener('DOMContentLoaded', function() {
    const formLogin = document.getElementById('formLogin');
  
    formLogin.addEventListener('submit', function(event) {
      event.preventDefault();
      const loginUsername = document.getElementById('loginUsername').value;
      const loginPassword = document.getElementById('loginPassword').value;
  
      //-------------a informação que foi salva no código anterior é recuperada no DBSTORAGE
      const savedUsername = localStorage.getItem('username');
      const savedPassword = localStorage.getItem('password');
            
      //checando se o loginUserName bate com savedUserName - o mesmo vale para a senha - o resto é deixado como está...
      if (loginUsername === savedUsername && loginPassword === savedPassword) {
        alert('Login bem sucedido!');
        window.location.href = "content/mentor/mentorIndex.html";
      } else {
        alert('Usuário ou senha incorretos. Tente novamente.');
      }
    });
  });