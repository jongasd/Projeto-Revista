const express = require('express')
const pool = require('./config/database')

const app = express()
app.use(express.json())

const queryAsync = (sql, values = []) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (err, results) => {
      if (err) reject(err)
      else resolve(results)
    })
  })
}

// GET
app.get("/", (req, res) => {
  res.send("API NOTICIA")
})

app.get("/noticia", async (req, res) => {
  try {
    const noticia = await queryAsync("SELECT * FROM noticia")

    res.json({
      sucesso: true,
      dados: noticia,
      total: noticia.length,
    })
  } catch (erro) {
    res.status(500).json({ sucesso: false, mensagem: erro.message })
  }
})

app.get("/noticia/:id", async (req, res) => {
  try {
    const id = Number(req.params.id)

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "ID inválido",
      })
    }

    const noticia = await queryAsync(
      "SELECT * FROM noticia WHERE id = ?",
      [id]
    )

    if (noticia.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: "Notícia não encontrada",
      })
    }

    res.json({
      sucesso: true,
      dados: noticia[0],
    })
  } catch (erro) {
    res.status(500).json({ sucesso: false, mensagem: erro.message })
  }
})

// POST
app.post('/noticia', async (req, res) => {
  try {
    let { usuario_id, categoria_id, titulo, genero, descricao, conteudo } = req.body

    if (
      !usuario_id ||
      !categoria_id ||
      !titulo ||
      !genero ||
      !descricao ||
      !conteudo ||
      conteudo.trim() === ''
    ) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Todos os campos são obrigatórios'
      })
    }

    const novaNoticia = {
      usuario_id: Number(usuario_id),
      categoria_id: Number(categoria_id),
      titulo: titulo.trim(),
      genero: genero.trim(),
      descricao: descricao.trim(),
      conteudo: conteudo.trim()
    }

    const resultado = await queryAsync(
      'INSERT INTO noticia SET ?',
      [novaNoticia]
    )

    res.status(201).json({
      sucesso: true,
      mensagem: 'Notícia adicionada com sucesso',
      id: resultado.insertId
    })

  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: erro.message
    })
  }
})

// PUT
app.put('/noticia/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'ID inválido'
      })
    }

    const existe = await queryAsync(
      'SELECT * FROM noticia WHERE id = ?',
      [id]
    )

    if (existe.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Notícia não encontrada'
      })
    }

    const { titulo, genero, descricao, conteudo } = req.body
    const atualizado = {}

    if (titulo) atualizado.titulo = titulo.trim()
    if (genero) atualizado.genero = genero.trim()
    if (descricao) atualizado.descricao = descricao.trim()
    if (conteudo) atualizado.conteudo = conteudo.trim()

    if (Object.keys(atualizado).length === 0) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Nada para atualizar'
      })
    }

    await queryAsync(
      'UPDATE noticia SET ? WHERE id = ?',
      [atualizado, id]
    )

    res.json({
      sucesso: true,
      mensagem: 'Notícia atualizada com sucesso'
    })

  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: erro.message
    })
  }
})

// DELETE
app.delete('/noticia/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'ID inválido'
      })
    }

    const resultado = await queryAsync(
      'DELETE FROM noticia WHERE id = ?',
      [id]
    )

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Notícia não encontrada'
      })
    }

    res.json({
      sucesso: true,
      mensagem: 'Notícia apagada com sucesso'
    })

  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: erro.message
    })
  }
})

module.exports = app