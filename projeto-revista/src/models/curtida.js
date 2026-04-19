const pool = require("../config/database");

const executarQuery = (sql, valores = []) =>
  new Promise((resolve, reject) => {
    pool.query(sql, valores, (erro, resultado) => {
      if (erro) return reject(erro);
      resolve(resultado);
    });
  });

const Curtida = {
  findByNoticia: (noticia_id) =>
    executarQuery(
      `
        SELECT c.*, u.nome AS autor
        FROM curtida c
        LEFT JOIN usuario u ON u.id = c.usuario_id
        WHERE c.noticia_id = ?
      `,
      [noticia_id],
    ),

  contarPorNoticia: async (noticia_id) => {
    const resultado = await executarQuery(
      "SELECT COUNT(*) AS total FROM curtida WHERE noticia_id = ?",
      [noticia_id],
    );
    return resultado[0].total;
  },

  findByUsuarioENoticia: async (usuario_id, noticia_id) => {
    const resultado = await executarQuery(
      "SELECT * FROM curtida WHERE usuario_id = ? AND noticia_id = ?",
      [usuario_id, noticia_id],
    );
    return resultado[0] ?? null;
  },

  create: async (dados) => {
    const resultado = await executarQuery("INSERT INTO curtida SET ?", [dados]);
    return resultado.insertId;
  },

  delete: (id) => executarQuery("DELETE FROM curtida WHERE id = ?", [id]),
};

module.exports = Curtida;
