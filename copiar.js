app.post('/filmes', async (req, res) => {
    try {
        const { titulo, genero, duracao, classificacao, data_lancamento } = req.body

        if (!titulo || !genero || !duracao || titulo == ' ') {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Titulo, genero e duração são obrigatórios'
            })
        }

        if (typeof duracao !== 'number' || duracao <= 0) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Duração deve ser um número positivo'
            })
        }

        const novoFilme = {
            titulo: titulo.trim(),
            genero: genero.trim(),
            duracao: duracao,
            classificacao: classificacao || null,
            data_lancamento: data_lancamento || null
        }

        const resultado = await queryAsync('INSERT INTO filme SET ?', [novoFilme])

        res.status(201).json({
            sucesso: true,
            mensagem: 'Filme criado com sucesso',
            id: resultado.insertId
        })
    } catch (erro) {
        console.error('Erro ao cadastrar filme:', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao cadastrar filme',
            erro: erro.message
        })
    }
})