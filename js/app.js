//----------------------------------
const form = document.querySelector("#formulario");

const renderMentores = (mentores) => {
  const table = document.querySelector("tbody");
  let tableContent = "";

  mentores.forEach(mentor => {
    tableContent += `
      <tr>
        <td>${mentor.id}</td>
        <td>${mentor.nome}</td>
        <td>${mentor.email}</td>
        <td>
          <button onclick="alteraItem(${mentor.id})"><i class='bx bx-edit-alt'></i></button>
        </td>
        <td>
          <button onclick="deleteItem(${mentor.id})"><i class='bx bx-trash'></i></button>
        </td>
      </tr>`;
  });

  table.innerHTML = tableContent;
};

const getMentores = async () => {
  try {
    const response = await fetch("http://localhost:3000/mentores");
    if (!response.ok) {
      throw new Error('Erro ao buscar mentores.');
    }
    const mentores = await response.json();
    renderMentores(mentores);
  } catch (error) {
    console.error("Erro ao buscar mentores:", error);
  }
};

//-----------------------------EDITAR------------------
const alteraItem = (id) => {
  window.location = `mentorAltera.html?id=${id}`
}

//----------------------FUNCAO QUE IRÁ DELETAR--------------------------------
const deleteItem = async (mentorId) => {
  try {
    const response = await fetch(`http://localhost:3000/mentores/${mentorId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erro ao deletar o mentor.');
    }

    getMentores();
  } catch (error) {
    console.error("Erro ao deletar mentor:", error);
  }
};

getMentores();