//-----------------PEGA A ID NOS MENTORES PARA USAR NO SELECT-------------------
const buscarMentor = async (id) => {
    try {
        const resposta = await fetch(`http://localhost:3000/mentores/${id}`);
        const mentor = await resposta.json();
        return mentor;
    } catch (error) {
        console.error("ERRO AO BUSCAR MENTOR:", error);
        return null;
    }
};

//-------------PEGA AS ID's DOS MENTORES PARA USAR NO SELECT(ACESSA TUDO)----------------------//
const buscarMentores = async () => {
    try {
        const resposta = await fetch(`http://localhost:3000/mentores`);
        const mentores = await resposta.json();
        return mentores;
    } catch (error) {
        console.error("ERRO AO BUSCAR MENTORES:", error);
        return [];
    }
};

//--------INFORMAÇÃO OBTIDA NOS CÓDIGOS ANTERIORES INSERIDA AQUI----------//
const carregarSelect = async () => {
    const mentorSelect = document.getElementById('nomeMentor');
    const opcaoVazia = new Option('Selecione um mentor...');
    mentorSelect.options.add(opcaoVazia);

    try {
        const mentores = await buscarMentores();
        mentores.forEach((mentor) => {
            const opcao = new Option(mentor.nome, mentor.id);
            mentorSelect.options.add(opcao);
        });
    } catch (error) {
        console.error("ERRO AO CARREGAR A LISTA DE MENTORES:", error);
    }
};

carregarSelect();


//------------NOVAMETORIA-----------------//
const novaMetoria = async (mentorias) => {
    try {
        await fetch('http://localhost:3000/mentorias', {
            method: 'POST',
            headers: {
                "ACCEPT": 'application/json, text/plain, */*',
                "CONTENT-TYPE": 'application/json'
            },
            body: JSON.stringify(mentorias)
        });
        window.location = "./mentoriaIndex.html";
    } catch (error) {
        console.error("ERRO AO CRIAR NOVA MENTORIA:", error);
    }
};

// ADICIONA EVENTO AO FORMULÁRIO PARA CRIAR NOVA MENTORIA
const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const mentoria = formulario.elements['nomeMentoria'].value;
    const mentor = formulario.elements['nomeMentor'].value;
    const checkbox = formulario.elements['statusToggle'].checked;

    const mentorObjeto = await buscarMentor(mentor);
    if (!mentorObjeto) {
        console.error("MENTOR NÃO ENCONTRADO.");
        return;
    }

    const mentorias = {
        mentoria,
        mentor: mentorObjeto.nome,
        checkbox
    };

    novaMetoria(mentorias);
});

// FUNÇÃO: TOGGLESTATUS
const toggleStatus = () => {
    const checkbox = document.getElementById('statusToggle').checked;
    const statusTxt = document.getElementById('statusTxt');

    statusTxt.innerText = checkbox ? "Ativo" : "Inativo";
};
