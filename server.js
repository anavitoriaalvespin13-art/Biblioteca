const express = require('express');
const cors = require('cors');

const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas

app.post('/usuario/login', (req, res) => {
    const { email, senha } = req.body;

    const consulta = 'SELECT * FROM usuario WHERE email = ? AND senha = ?';

    if (!email || !senha) 
    return res.status(400).json({ error: 'Preencha todos os campos'});

    db.query(consulta, [email, senha], (err, results) => { 

        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao conectar no banco de dados', });
        } else {
            if (results.length > 0) {

                const user = results[0];

                let redirecionamento = ''

                if(user.perfil === 'leitor'){
                     redirecionamento = './leitor.html';
                } else {
                     redirecionamento = './bibliotecario.html';
                }

                res.status(201).json({ 
                    message: 'Login bem-sucedido!',
                    redirect: redirecionamento,

                    user: { 
                        id: user.id,
                        nome: user.nome,
                        email: user.email,
                        perfil: user.perfil
                    }
                });
            } else {
                res.status(401).json({ error: 'Usuario ou senha estão incorretos'});
            }
        }
    });
});

app.post('/usuario/cadastro', (req, res) => {

    const { nome, email, senha, perfil } = req.body;

    if(!nome || !email || !senha || !perfil)
        return res.status(400).json({
           message: 'Preencha todos os campos'
    })

    const consulta = 'INSERT INTO usuario (nome, email, senha, perfil) VALUES (?,?,?,?)';

    db.consulta( consulta, [nome, email, senha, perfil], (err, result) => {  
        
        if (err) {
            console.error('Erro ao cadastrar usuário:', err);
            res.status(500).json({ message: 'Erro ao cadastrar usuário'});
        } else {
            res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
        }
    }
  );
});


app.post('/criar/livro', (req, res) => {

    console.log(req.body);

    const {titulo, autor, ano, quantidade_inicial} = req.body;

    const consulta = 'INSERT INTO livros (titulo, autor, ano, quantidade_inicial) VALUES (?,?,?,?)';

    db.query(consulta, [titulo, autor, ano, quantidade_inicial], (err, result) => {

        if(err){
            console.error('Erro ao se comunicar com o Banco de dados:', err);
            return res.status(500).json({ erro: 'Erro ao cadastrar livro'});
        }
          res.status(201).json({ message: 'Livro cadastrado com sucesso!'})
    })

})

app.get('/livros', (req, res) => {
    
    const consulta = 'SELECT * FROM livros';

    db.query(consulta, (err, result) => {

        if(err){
            console.error(err)
            return res.status(500).json({ erro:'Erro ao conectar com servidor'});
        }

        res.json(result)
    })
});

app.delete('/livro/:id', (req, res) => {

    const { id } = req.params;

    const consulta = 'DELETE FROM livros WHERE id = ?';

    db.query(consulta, [id], (err,result) => {
      
        if(err){
        return res.status(500).json({ erro: 'Erro ao conectar com o banco de dados'})
        }
        res.status(200).json({
            message: 'Livro deletado com sucesso'
        })
    })
})

app.put('/editar/:id',  (req, res) => {
    const {titulo, autor, ano, quandidade_inicial} = req.body
    const {id} = req.params

    const consulta = ''
})

app.get('/emprestimos', (req, res) => {
    
    const consulta = 'SELECT * FROM emprestimos';

    db.query(consulta, (err, result) => {

        if(err){
            console.error(err)
            return res.status(500).json({ erro:'Erro ao conectar com servidor'});
        }

        const emprestimo = result.map(item => ({
            id_livro: item.id_livro,
            id_leitor: item.id_leitor,
            data_emprestimo: item.data_emprestimo?.toISOString().split('T')[0],
            data_devolucao_prevista: item.data_prevista?.toISOString().split('T')[0],
            data_devolucao: item.data_devolucao?.toISOString().split('T')[0]
        }))

        res.json(emprestimo)
        console.log(result)
    })
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta http://localhost:3000');
});
