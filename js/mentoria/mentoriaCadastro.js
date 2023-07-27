const formulario = document.getElementById('formulario')

const buscarMentor = async (id)=> {
    const resposta = await fetch(`http://localhost:3000/mentores/${id}`)
    const mentor = await resposta.json()
    return mentor
}

const buscarMentores = async ()=> {
    const resposta = await fetch(`http://localhost:3000/mentores`)
    const mentores = await resposta.json()
    return mentores
}

const carregarSelect = async ()=> {
    const mentores = await buscarMentores()
    const mentorSelect = document.getElementById('mentor')

    const opcaoVazia = new Option('Selecione um mentor...')
    mentorSelect.options.add(opcaoVazia)

    mentores.forEach(mentores => {
    const opcao = new Option(mentores.mentor, mentores.id)
    mentorSelect.options.add(opcao)
    });
}
carregarSelect()

const novaMetoria = async (mentorias) => {
    await fetch('http://localhost:3000/mentorias',{
        method: 'POST',
        headers: {
            "Accept": 'application/json, text/plain, */*',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(mentorias)
    })
    window.location = "mentorIndex.html"
}

formulario.addEventListener('submit', async(event) => {
event.preventDefault()

    const mentoria = formulario.elements['nome'].value
    const mentor = formulario.elements['mentor'].value
    const checkbox = formulario.elements['statusToggle'].checked

    const mentorObjeto = await buscarMentor(mentor)
    const mentorias = {
        mentoria,
        mentor: mentorObjeto.mentor,
        checkbox
    }

    novaMetoria(mentorias)

})

const toggleStatus = () => {
    const checkbox = document.getElementById('statusToggle').checked;
    const statusTxt = document.getElementById('statusTxt');

    if (checkbox) {
        statusTxt.innerText = "Ativo";
    } else {
        statusTxt.innerText = "Inativo";
    }
};



//funções menu/navegar
const mentores = () => {
    window.location = "../mentores/mentores.html"
  }
  //vai para pagina mentoias
  const mentorias = () => {
     window.location = "./mentorias.html"
   }
  //vai para pagina turmas
  const turmas = () => {
     window.location = "/html/turmas/turmas.html"
  }
  //vai para pagina alunos
  const alunos = () => {
     window.location = "/html/alunos/alunos.html"
  }
  //vai apra pagina nova mentoria
  const novaMentoria = () => {
     window.location = "/html/mentorias/novaMentoria.html"
  }