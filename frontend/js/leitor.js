function telaAtiva(tela, linkClicado){
    const ativo = document.querySelector('.ativo')

    if(ativo){
      ativo.classList.remove('ativo')
    }

    linkClicado.classList.add('ativo')

    document.getElementById('tabela1').style.display = 'none'
    document.getElementById('tabela2').style.display = 'none'
    
    document.getElementById(tela).style.display = 'block'
}
function abrirModal() {
    document.getElementById("modal").style.display= "flex";
    document.getElementById("fundoModal").style.display = "flex";
}
function fecharModal(event){
    event.preventDefault();
    document.getElementById("modal").style.display= "none";
    document.getElementById("fundoModal").style.display = "none";
}

function solicitar(){
    alert('Livro solicitado com sucesso!');
}

async function livros(){
    const tabela = document.getElementById('tabelaLivros');
    tabela.innerHTML = '';

    const resposta = await fetch('http://localhost:3000/livros');
    const livros = await resposta.json();

    livros.forEach(livro => { 
        const linha = document.createElement('tr');

        linha.innerHTML = `
           <td>${livro.id}</td>
           <td>${livro.titulo}</td>
           <td>${livro.autor}</td>
           <td>${livro.ano}</td>
           <td><p>${livro.quantidade_inicial}</p></td> 
           <td ><button onclick="abrirModal()">SOLICITAR</button></td>
         `; 

    tabela.appendChild(linha);
 });
}

livros();