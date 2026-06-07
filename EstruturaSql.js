crate database biblioteca;

use biblioteca;

create table usuario (
    id int primary key auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null unique,
    senha varchar(100) not null
    perfil enum('leitor', 'bibliotecario') not null
);

create table livros (
    id int primary key auto_increment,
    titulo varchar(255) not null,
    autor varchar(255) not null,
    ano int not null,
    quantidade_inicial int not null
);  

create table emprestimos (
    id int primary key auto_increment,
    id_livro int not null,
    id_leitor int not null,
    data_emprestimo date not null,
    data_devolucao_prevista date not null,
    data_devolucao date,
    status enum('emprestado', 'devolvido') not null,
    foreign key (id_livro) references livros(id),
    foreign key (id_leitor) references usuario(id)
);

