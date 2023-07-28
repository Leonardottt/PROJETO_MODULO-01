//----OBTÉM INFORMAÇÕES DO FORMULÁRIO E SALVA NA API COMO NOVA MENTORIA-----//
const formulario = document.getElementById('formulario');
let mentoriasId = null;

//----BUSCA UM MENTOR PELO ID NA API------//
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

//----BUSCA TODOS OS MENTORES NA API------//
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

//----CARREGA AS OPÇÕES DO SELECT COM OS MENTORES DA API------//
const carregarSelect = async () => {
    const mentorSelect = document.getElementById('nomeMentor');

    // Limpar o select antes de carregar as opções
    mentorSelect.innerHTML = '';

    try {
        const mentores = await buscarMentores();

        // Adicionar a opção 'Selecione um mentor...' desabilitada
        const opcaoVazia = new Option('Selecione um mentor...', '');
        opcaoVazia.disabled = true;
        mentorSelect.options.add(opcaoVazia);

        mentores.forEach((mentor) => {
            const opcao = new Option(mentor.nome, mentor.id);
            mentorSelect.options.add(opcao);
        });
    } catch (error) {
        console.error("ERRO AO CARREGAR A LISTA DE MENTORES:", error);
    }
};

carregarSelect();

//----CRIA UMA NOVA MENTORIA NA API-----//
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

//----ADICIONA EVENTO AO FORMULÁRIO PARA CRIAR UMA NOVA MENTORIA-----//
formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const mentoria = formulario.elements['nomeMentoria'].value;
    const mentor = formulario.elements['nomeMentor'].value;
    const checkbox = formulario.elements['statusToggle'].checked;

    // Verifica se um mentor foi selecionado antes de continuar
    if (!mentor || mentor === '') {
        alert("Por favor, selecione um mentor antes de criar a nova mentoria.");
        return;
    }

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

//----ALTERA O TEXTO DO STATUS ENTRE "Ativo" E "Inativo"-----//
const toggleStatus = () => {
    const checkbox = document.getElementById('statusToggle').checked;
    const statusTxt = document.getElementById('statusTxt');

    statusTxt.innerText = checkbox ? "Ativo" : "Inativo";
};

//----OBTÉM O ID DA URL PARA BUSCAR AS INFORMAÇÕES DA MENTORIA-----//
const getIdUrl = () => {
    const paramsString = window.location.search;
    const params = new URLSearchParams(paramsString);
    mentoriasId = params.get('id');
};

//----BUSCA AS INFORMAÇÕES DA MENTORIA NA API PELO ID-----//
const buscartitulomentorias = async () => {
    const resposta = await fetch(`http://localhost:3000/mentorias/${mentoriasId}`);
    const mentorias = await resposta.json();
    return mentorias;
};

//----EDITA A MENTORIA NA API-----//
const editarMetoria = async (mentorias) => {
    try {
        await fetch(`http://localhost:3000/mentorias/${mentoriasId}`, {
            method: 'PUT',
            headers: {
                "Accept": 'application/json, text/plain, */*',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(mentorias)
        });
        window.location = "./mentoriaIndex.html";
    } catch (error) {
        console.error("ERRO AO EDITAR MENTORIA:", error);
        // Adicionar mensagem de erro ao usuário (opcional)
    }
};

//----CARREGA OS DADOS DO FORMULÁRIO COM AS INFORMAÇÕES DA MENTORIA-----//
const carregarDadosFormulario = async (mentorias) => {
    if (mentorias) {
        document.getElementById('nomeMentoria').value = mentorias.mentoria;
        document.getElementById('nomeMentor').value = mentorias.mentor;
        document.getElementById('statusToggle').checked = mentorias.checkbox;

        const content_chk = document.getElementById('statusTxt');
        if (mentorias.checkbox === true) {
            content_chk.innerText = "Ativo";
        } else {
            content_chk.innerText = "Inativo";
        }
    }
};

//----CARREGA OS DADOS DA MENTORIA-----//
const carregarDados = async () => {
    getIdUrl();
    const titulomentorias = await buscartitulomentorias();
    await carregarSelect();
    carregarDadosFormulario(titulomentorias);
};

carregarDados();
