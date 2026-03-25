const express = require ('express')
const pool = require('./config/database')

const app = express()

app.use(express.json())

const queryAsync = (sql, values = []) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

app.get("/", (req, res) => {
  res.send("API REVISTA");
});

app.get("/revistas", async (req, res) => {
  try {
    const revistas = await queryAsync("SELECT * FROM filme");

    res.json({
      sucesso: true,
      dados: revistas,
      total: revistas.length,
    });
  } catch (erro) {
    console.error("Erro ao listar revistas:", erro);

    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao listar revistas",
      erro: erro.message,
    });
  }
});



module.exports = app