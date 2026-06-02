// src/models/noticia.js
const pool = require("../config/database");

const executarQuery = (sql, valores = []) =>
  new Promise((resolve, reject) => {
    pool.query(sql, valores, (erro, resultado) => {
      if (erro) return reject(erro);
      resolve(resultado);
    });
  });

const Noticia = {
  findAll: () =>
    executarQuery(`
      SELECT n.*, u.nome AS autor, c.tipo_categoria AS categoria
      FROM noticia n
      LEFT JOIN usuario u ON u.id = n.usuario_id
      LEFT JOIN categoria c ON c.noticia_id = n.id
    `),

  findById: async (id) => {
    const resultado = await executarQuery(
      `SELECT n.*, u.nome AS autor, c.tipo_categoria AS categoria
       FROM noticia n
       LEFT JOIN usuario u ON u.id = n.usuario_id
       LEFT JOIN categoria c ON c.noticia_id = n.id
       WHERE n.id = ?`,
      [id],
    );
    return resultado[0] ?? null;
  },

  create: async (dados) => {
    const resultado = await executarQuery("INSERT INTO noticia SET ?", [dados]);
    return resultado.insertId;
  },

  update: (id, dados) =>
    executarQuery("UPDATE noticia SET ? WHERE id = ?", [dados, id]),

  delete: (id) => executarQuery("DELETE FROM noticia WHERE id = ?", [id]),
};

module.exports = Noticia;
