const pool = require("../config/database");

const executarQuery = (sql, valores = []) =>
  new Promise((resolve, reject) => {
    pool.query(sql, valores, (erro, resultado) => {
      if (erro) return reject(erro);
      resolve(resultado);
    });
  });

const Favoritar = {
  findByUsuario: (usuario_id) =>
    executarQuery(
      `
        SELECT f.*, n.titulo AS noticia_titulo
        FROM favoritar f
        LEFT JOIN noticia n ON n.id = f.noticia_id
        WHERE f.usuario_id = ?
        ORDER BY f.created_at DESC
      `,
      [usuario_id],
    ),

  findByUsuarioENoticia: async (usuario_id, noticia_id) => {
    const resultado = await executarQuery(
      "SELECT * FROM favoritar WHERE usuario_id = ? AND noticia_id = ?",
      [usuario_id, noticia_id],
    );
    return resultado[0] ?? null;
  },

  create: async (dados) => {
    const resultado = await executarQuery("INSERT INTO favoritar SET ?", [
      dados,
    ]);
    return resultado.insertId;
  },

  delete: (id) => executarQuery("DELETE FROM favoritar WHERE id = ?", [id]),
};

module.exports = Favoritar;
