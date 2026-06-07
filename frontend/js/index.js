
function mostrarCadastro() {
    document.getElementById("login").style.display = "none";
    document.getElementById("cadastro").style.display = "flex";

    document.getElementById("criar").classList.add("ativo");
    document.getElementById("entra").classList.remove("ativo");

    document.getElementById("bemvindoCadastro").style.display = "flex";
    document.getElementById("bemvindoLogin").style.display = "none"; 
}
function mostrarLogin() {
    document.getElementById("login").style.display = "flex";
    document.getElementById("cadastro").style.display = "none";

    document.getElementById("entra").classList.add("ativo");
    document.getElementById("criar").classList.remove("ativo");

    document.getElementById("bemvindoCadastro").style.display = "none";
    document.getElementById("bemvindoLogin").style.display = "flex";
}
function feedbackconfirmado(texto) {
    const confirmado = document.getElementById('mensagens');
    confirmado.textContent = texto;
    confirmado.style.display = 'block'; 

    setTimeout(() => {
        confirmado.style.display = 'none'; 
    }, 3000);
}
function feedbackconerro(texto) {
    const confirmado = document.getElementById('mensagensErro-login');
    confirmado.textContent = texto;
    confirmado.style.display = 'block'; 

    setTimeout(() => {
        confirmado.style.display = 'none'; 
    }, 3000);
}
function feedbackconerroCadastro(texto) {
    const confirmado = document.getElementById('mensagensErroCadastro');
    confirmado.textContent = texto;
    confirmado.style.display = 'block'; 

    setTimeout(() => {
        confirmado.style.display = 'none';
    }, 3000);
}
function feedbackconerrologin(texto) {
    const confirmado = document.getElementById('mensagensErroLogin');
    confirmado.textContent = texto;
    confirmado.style.display = 'block'; 

    setTimeout(() => {
        confirmado.style.display = 'none'; 
    }, 3000);
}

async function login() {
   
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const response = await fetch('http://localhost:3000/usuario/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    }); 

    const data = await response.json();
    if (response.ok) {

    feedbackconfirmado(data.message);    

    setTimeout(() => { 
      window.location.href = data.redirect; 
    }   , 5000);  

    } else {
        feedbackconerrologin(data.error);
    }
}

async function cadastrar(){

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('emailCadastro').value;
    const senha = document.getElementById('senhaCadastro').value;
    const perfil = document.getElementById('perfil').value;

    const response = await fetch('http://localhost:3000/usuario/cadastro', {
        method: 'POST',
        headers: {      
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha, perfil })
    });

     const data = await response.json();

    if (response.ok) {
        feedbackconfirmado(data.message);
    } else {
        feedbackconerroCadastro(data.message);
    }

}

