document.getElementById("btnLogin").addEventListener("click", function(event) {
    event.preventDefault(); // Evita que o formulário seja submetido (caso haja um "submit" no form)
    
    // Verificar se os campos do formulário estão preenchidos
    const email = document.getElementById("emailLoginIndex").value.trim();
    const senha = document.getElementById("passwordLoginIndex").value.trim();
  
    if (email === "" || senha === "") {
        alert("Por favor, preencha todos os campos do formulário.");
    } else {
        window.location.href = "content/mentor/mentorIndex.html";
    }
});