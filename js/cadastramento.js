const formulario = document.getElementById("formulario")

formulario.addEventListener("submit", (e) => {
  e.preventDefault()

  const nomeMentor = formulario.elements['nome-mentor'].value
  const emailMentor = formulario.elements['email-mentor'].value

  const Mentores = {
    nomeMentor,
    emailMentor,
  }

  cadastrarLivro(Mentores)
})

const cadastrarLivro = async (Mentores) => {
  await fetch("http://localhost:3000/Mentores",{
    method: 'POST',
    headers: {
      "Accept": 'application/json, text/plain, */*',
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(Mentores)
  })

  window.location = 'mentorIndex.html'
}