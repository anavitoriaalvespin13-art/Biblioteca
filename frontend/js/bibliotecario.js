
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
function feedbackfirmado(texto) {
    const confirmado = document.getElementById('mensagensConfirm');
    confirmado.textContent = texto;
    confirmado.style.display = 'flex'; 

    setTimeout(() => {
         confirmado.style.display = 'none';  
    }, 3000);
}
function feedbackerro(texto) {
    const confirmado = document.getElementById('mensagensErro');
    confirmado.textContent = texto;
    confirmado.style.display = 'flex'; 

    setTimeout(() => {
         confirmado.style.display = 'none'; 
    }, 3000);
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
           <td> 
             <button onclick ="editar((${livro.id})")><i style="color: #ffff" class="bi bi-pen"></i></button>
             <button onclick ="deletar(${livro.id})"><i style="color: brown;" class="bi bi-trash3"></i></button>
            </td>
         `; 

    tabela.appendChild(linha);
 });
}
async function criarLivro(event){
     event.preventDefault()
     const formulario = document.getElementById('formulario')
     const titulo = document.getElementById('titulo').value;
     const autor = document.getElementById('autor').value;
     const ano = document.getElementById('ano').value;
     const quantidade_inicial= document.getElementById('quantidade').value;
     
     const resposta = await fetch('http://localhost:3000/criar/livro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, autor, ano, quantidade_inicial})
     });
    
    const data = await resposta.json();
    if(resposta.ok){
     
     setTimeout(() => {
     fecharModal(event)
     livros() 
     }, 1000)
    
    feedbackfirmado(data.message); 
    formulario.reset()
    
     } else{
    feedbackerro(data.erro);
     }
}
async function deletar(id){
  console.log('item deletado', id)

  const resposta = await fetch(`http://localhost:3000/livro/${id}`, {
    method : 'DELETE'
  })
  
  const dados = await resposta.json() 

  if(resposta.ok){     
      livros()
     feedbackfirmado(dados.message)
  }
}
async function editar(id){
  console.log('item editado', id)
}

async function emprestimos(){
    const tabela = document.getElementById('tabelaEmprestimo');
    tabela.innerHTML = '';

    const resposta = await fetch('http://localhost:3000/emprestimos');
    const emprestimos = await resposta.json();

    emprestimos.forEach(emprestimo => { 
        const linha = document.createElement('tr');

        linha.innerHTML = `
           <td>${emprestimo.id_leitor}</td>
           <td>${emprestimo.id_livro}</td>
           <td>${emprestimo.data_emprestimo}</td>
           <td>${emprestimo.data_devolucao_prevista}</td>
           <td>${emprestimo.data_devolucao}</td>
           <td> 
             <button onclick ="editar((${emprestimo.id})")><i style="color: #ffff" class="bi bi-pen"></i></button>
             <button onclick ="deletar(${emprestimo.id})"><i style="color: brown;" class="bi bi-trash3"></i></button>
            </td>
         `; 

    tabela.appendChild(linha);
 });
}

livros()
emprestimos()
