// ===========>>>  COMEÇANDO JS DE LOGIN 
const login = document.querySelector("#btn-entrar");
const SmallMsgerror = document.querySelector("#smallerror")
login.addEventListener("click" , async(e) => {
  e.preventDefault();
    try {
    const userLogin = document.querySelector("#loginInput").value
    const userPassword = document.querySelector("#passUserInput").value

    //VERIFICANDO SE USUARIO EXISTE
      const existingUser = await userExists(userLogin, userPassword);
      if (existingUser) {
        window.location.replace("content/home.html");
    } else {
        // SmallMsgerror.innerHTML = `O nome ${userLogin} não esta cadastrado(a).`
        alert("Usuário não cadastrado")
    }
    } catch(error) {
        console.log(error)
    }     

})