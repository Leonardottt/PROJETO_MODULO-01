

const renderMentores = (Mentores) => {
    const tabela = document.querySelector("tbody")
  
    Mentores.forEach(Mentores => {
      tabela.innerHTML = tabela.innerHTML + `
        <tr> 
          <td>${Mentores.nomeMentor}</td>
          <td>${Mentores.emailMentor}</td>
        </tr>
      `
    })
  }
  
  const getMentores = async () => {
    const response = await fetch("http://localhost:3000/Mentores")
    const Mentores = await response.json()
  
    renderMentores(Mentores)
  }
  
  getMentores()
  
  