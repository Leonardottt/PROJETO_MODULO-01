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
    const mentorSelect = document.getElementById('nomeMentor')
    
    const opcaoVazia = new Option('Selecione um mentor...')
    mentorSelect.options.add(opcaoVazia)

    mentores.forEach(mentores => {
    const opcao = new Option(mentores.nome, mentores.id)
    mentorSelect.options.add(opcao)
    });
}
carregarSelect()


const novaMetoria = async (mentorias) => {
    try {
        await fetch('http://localhost:3000/mentorias',{
        method: 'POST',
        headers: {
            "Accept": 'application/json, text/plain, */*',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(mentorias)
    });
    window.location = "mentoriaIndex.html";
    } catch (error) {
        console.error("Erro ao criar novo mentor:", error);
    }
}



const formulario = document.getElementById('formulario')

formulario.addEventListener('submit', async(event) => {
    event.preventDefault()

    const mentoria = formulario.elements['nomeMentoria'].value
    const mentor = formulario.elements['nomeMentor'].value
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



//vai para pagina mentoias
const redirectToMentorias = () => {
    window.location = "mentorIndex.html"
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