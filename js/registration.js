const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();

    const nome = form.elements['nomeMentor'].value;
    const email = form.elements['emailMentor'].value;

    const mentor = {
        nome,
        email
    };

    try {
        await cadastrarMentor(mentor);
        redirectToMentorIndex();
    } catch (error) {
        console.error("Erro ao cadastrar mentor:", error);
    }
}

async function cadastrarMentor(mentor) {
    const response = await fetch("http://localhost:3000/mentores", {
        method: 'POST',
        headers: {
            "Accept": 'application/json, text/plain, */*',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(mentor)
    });

    if (!response.ok) {
        throw new Error('Erro ao cadastrar o mentor.');
    }
}

function redirectToMentorIndex() {
    window.location = 'mentorIndex.html';
}